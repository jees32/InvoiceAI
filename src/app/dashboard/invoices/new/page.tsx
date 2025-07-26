'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Plus, Trash2, FileText, Download, UserRound, Loader2, Settings } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import html2pdf from 'html2pdf.js';
import { InvoicePreview } from '@/components/invoice-preview';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProducts, type Product as AvailableProduct } from '@/app/actions/products';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/lib/SupabaseAuthProvider';
import { getProfile } from '@/app/actions/profile';
import { invoiceTemplates } from '@/components/templates/templates';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import Link from 'next/link';

type Message = {
    id: number;
    sender: 'bot' | 'user';
    content: React.ReactNode;
};

type Product = {
    name: string;
    quantity: number;
    price: number;
    tax: number;
};

type Customer = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

export default function NewInvoicePage() {
    const { toast } = useToast();
    const { user } = useSupabaseAuth();
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'bot', content: "Hello! I'm your InvoicePilot assistant. Let's start by entering the customer's details." },
    ]);
    const [customer, setCustomer] = useState<Customer>({ name: '', email: '', phone: '', address: '' });
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '1' });

    const [availableProducts, setAvailableProducts] = useState<AvailableProduct[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [profileId, setProfileId] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
    const [company, setCompany] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        gst: '',
        logo: '',
    });
    const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
    const [dueDate, setDueDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [invoiceDateOpen, setInvoiceDateOpen] = useState(false);
    const [dueDateOpen, setDueDateOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setProductsLoading(true);
                if (user?.id) {
                    const productsFromDb = await getProducts(user.id);
                    setAvailableProducts(productsFromDb);
                } else {
                    setAvailableProducts([]);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Could not fetch products from the database.",
                });
            } finally {
                setProductsLoading(false);
            }
        };
        fetchProducts();
    }, [toast, user]);

    useEffect(() => {
        async function fetchProfileIdAndTemplate() {
            if (!user?.id) return;
            try {
                const profile = await getProfile(user.id);
                if (profile) {
                    setProfileId(profile.id || null);
                    
                    // Check for template parameter in URL first
                    const urlParams = new URLSearchParams(window.location.search);
                    const urlTemplate = urlParams.get('template');
                    
                    if (urlTemplate) {
                        setSelectedTemplate(urlTemplate);
                    } else if (profile.defaultTemplate) {
                        setSelectedTemplate(profile.defaultTemplate);
                    }
                    
                    setCompany({
                        name: profile.companyName || '',
                        address: profile.address || '',
                        email: user.email || '',
                        phone: profile.contactNumber || '',
                        gst: profile.gstNumber || '',
                        logo: profile.logoUrl || '',
                    });
                } else {
                    setProfileId(null);
                }
            } catch (e) {
                setProfileId(null);
            }
        }
        fetchProfileIdAndTemplate();
    }, [user]);

    const addMessage = (sender: 'bot' | 'user', content: React.ReactNode) => {
        setMessages(prev => [...prev, { id: prev.length + 1, sender, content }]);
    };

    const handleCustomerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMessage('user', 
            <div className="space-y-1">
                <p><strong>Customer:</strong> {customer.name}</p>
                <p className="text-sm">Details provided.</p>
            </div>
        );
        addMessage('bot', `Great! Let's add some products for ${customer.name}.`);
        setStep(1);
    };
    
    const handleAddProduct = () => {
        const selectedProduct = availableProducts.find(p => p.name === newProduct.name);
        if(selectedProduct && parseFloat(newProduct.quantity) > 0) {
            const productToAdd = {
                name: selectedProduct.name,
                quantity: parseFloat(newProduct.quantity),
                price: selectedProduct.price,
                tax: selectedProduct.tax,
            };
            setProducts(prev => [...prev, productToAdd]);
            setNewProduct({ name: '', quantity: '1' });
            console.log('Product added:', productToAdd, 'Total products:', products.length + 1);
        } else {
            console.log('Cannot add product:', { selectedProduct, quantity: newProduct.quantity });
        }
    }

    const handleRemoveProduct = (index: number) => {
        setProducts(prev => prev.filter((_, i) => i !== index));
    }

    const formatDate = (date: Date) => format(date, 'dd-MM-yyyy');

    const handleFinalize = async () => {
        // Prepare invoice data
        if (!profileId) {
            addMessage('bot', 'Error: No profile found for this user. Please set up your company profile first.');
            return;
        }
        const invoiceData = {
            invoiceNumber: `INV-${Date.now()}`,
            customerName: customer.name,
            customerEmail: customer.email,
            customerPhone: customer.phone,
            customerAddress: customer.address,
            issueDate: invoiceDate.toISOString(),
            dueDate: dueDate.toISOString(),
            status: 'Pending',
            subtotal,
            totalGst,
            totalAmount,
            userId: user?.id,
            profileId: profileId,
            templateId: selectedTemplate,
        };
        const items = products.map(p => ({
            name: p.name,
            quantity: p.quantity,
            price: p.price,
            tax: p.tax,
        }));
        try {
            const res = await fetch('/api/create-invoice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invoice: invoiceData, items }),
            });
            const result = await res.json();
            if (res.ok) {
                addMessage('bot', 'Invoice saved to database!');
                setStep(2);
                // Optionally redirect to invoices page
                // router.push('/dashboard/invoices');
            } else {
                addMessage('bot', `Error saving invoice: ${result.error}`);
            }
        } catch (error) {
            addMessage('bot', `Error saving invoice: ${error instanceof Error ? error.message : String(error)}`);
        }
    };
    
    const downloadPDF = () => {
        const element = document.getElementById('invoice-preview');
        if (!element) {
            console.error('Invoice preview element not found');
            return;
        }
        const opt = {
          margin:       0.5,
          filename:     `invoice-${customer.name.replace(' ','-')}-${new Date().toISOString().split('T')[0]}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    }

    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const totalGst = products.reduce((acc, p) => acc + (p.price * p.quantity * (p.tax / 100)), 0);
    const totalAmount = subtotal + totalGst;

    const botAvatar = <Avatar className="h-8 w-8"><AvatarFallback><Bot/></AvatarFallback></Avatar>;
    const userAvatar = <Avatar className="h-8 w-8"><AvatarImage src={user?.imageUrl || ''}/><AvatarFallback><UserRound/></AvatarFallback></Avatar>;

    const getTemplateDisplayName = (templateKey: string) => {
        const templateNames: { [key: string]: string } = {
            'elegant': 'Elegant',
            'minimal': 'Minimal', 
            'modern': 'Modern',
            'service': 'Professional', // Changed from 'Service' to 'Professional'
            'vibrant': 'Vibrant',
            'corporate': 'Corporate',
            'professional': 'Professional',
        };
        return templateNames[templateKey] || templateKey;
    };

    const renderStepContent = () => {
        if (step === 0) {
            return (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Customer Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="customer-form" onSubmit={handleCustomerSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="customer-name">Name</Label>
                                <Input id="customer-name" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="customer-email">Email</Label>
                                <Input id="customer-email" type="email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} placeholder="john.doe@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="customer-phone">Phone Number</Label>
                                <Input id="customer-phone" type="tel" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} placeholder="+91 98765 43210" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="customer-address">Shipping Address</Label>
                                <Textarea id="customer-address" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} placeholder="123 Main St, Anytown, USA" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="invoice-date">Invoice Date</Label>
                                    <Popover open={invoiceDateOpen} onOpenChange={setInvoiceDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                                type="button"
                                            >
                                                {formatDate(invoiceDate)} IST
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="p-0">
                                            <Calendar
                                                mode="single"
                                                selected={invoiceDate}
                                                onSelect={date => {
                                                    if (date) {
                                                        setInvoiceDate(date);
                                                        setInvoiceDateOpen(false);
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div>
                                    <Label htmlFor="due-date">Due Date</Label>
                                    <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                                type="button"
                                            >
                                                {formatDate(dueDate)} IST
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dueDate}
                                                onSelect={date => {
                                                    if (date) {
                                                        setDueDate(date);
                                                        setDueDateOpen(false);
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </form>
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold">Invoice Template</h2>
                                <Link href="/dashboard/templates">
                                    <Button variant="outline" size="sm">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Change Template
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-sm text-gray-600">
                                Using <strong>{getTemplateDisplayName(selectedTemplate)}</strong> template
                                {new URLSearchParams(window.location.search).get('template') && (
                                    <span className="text-blue-600 ml-1">(selected from templates page)</span>
                                )}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" form="customer-form" className="w-full">Continue</Button>
                    </CardFooter>
                </Card>
            );
        }
        if (step === 1) {
            return (
                 <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {products.length === 0 && (
                           <div className="text-center py-4 text-muted-foreground">
                               <p>No products added yet. Select a product and click the + button to add it.</p>
                           </div>
                       )}
                       {products.map((p, i) => (
                           <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                               <div>
                                   <p className="font-medium">{p.name}</p>
                                   <p className="text-sm text-muted-foreground">{p.quantity} x ₹{p.price.toFixed(2)} (+{p.tax}% GST)</p>
                               </div>
                               <div className="flex items-center gap-2">
                                    <p className="font-semibold">₹{(p.quantity * p.price).toFixed(2)}</p>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                               </div>
                           </div>
                       ))}
                        {productsLoading ? (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="h-6 w-6 animate-spin" />
                                <span className="ml-2">Loading products...</span>
                            </div>
                        ) : (
                        <div className="flex items-end gap-2">
                             <div className="flex-1">
                                <Label>Product</Label>
                                <Select value={newProduct.name} onValueChange={name => setNewProduct({...newProduct, name})}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableProducts.map(p => (
                                            <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-24">
                               <Label>Quantity</Label>
                               <Input type="number" placeholder="Qty" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: e.target.value})} min="1" />
                            </div>
                            <Button 
                                onClick={handleAddProduct} 
                                disabled={!newProduct.name || parseFloat(newProduct.quantity) <= 0}
                                className="px-4"
                            >
                                <Plus className="h-4 w-4 mr-1"/> Add
                            </Button>
                        </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col items-stretch gap-4">
                        <Separator />
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total GST</span>
                            <span>₹{totalGst.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <Button onClick={handleFinalize} disabled={products.length === 0}>
                            <FileText className="mr-2 h-4 w-4"/> Finalize Invoice
                        </Button>
                    </CardFooter>
                </Card>
            );
        }
        if (step === 2) {
            // Use selectedTemplate for preview
            const templateMeta = invoiceTemplates.find(t => t.id === selectedTemplate);
            const TemplateComponent = templateMeta?.component;
            return (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Invoice Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div id="invoice-preview">
                            {TemplateComponent && (
                                <TemplateComponent
                                    company={company}
                                    customer={customer}
                                    products={products}
                                    subtotal={subtotal}
                                    totalGst={totalGst}
                                    total={totalAmount}
                                    invoiceNumber={`INV-${Date.now()}`}
                                    issueDate={formatDate(invoiceDate) + ' IST'}
                                    dueDate={formatDate(dueDate) + ' IST'}
                                />
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={downloadPDF} className="w-full">
                            <Download className="mr-2 h-4 w-4"/> Download PDF
                        </Button>
                    </CardFooter>
                </Card>
            );
        }
        return null;
    };


    return (
        <div className="flex flex-col h-[calc(100vh-100px)]">
            <div className="flex-1 p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}
                        >
                            {message.sender === 'bot' && botAvatar}
                            <div className={`rounded-lg px-4 py-2 max-w-md ${message.sender === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                {message.content}
                            </div>
                            {message.sender === 'user' && userAvatar}
                        </motion.div>
                    ))}
                </AnimatePresence>
                 {renderStepContent()}
            </div>
        </div>
    );
}
