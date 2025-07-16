'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Plus, Trash2, FileText, Download, UserRound, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@clerk/nextjs';
import html2pdf from 'html2pdf.js';
import { InvoicePreview } from '@/components/invoice-preview';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProducts, type Product as AvailableProduct } from '@/app/actions/products';
import { useToast } from "@/hooks/use-toast";

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
    const { user } = useUser();
    const { toast } = useToast();
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'bot', content: "Hello! I'm your InvoicePilot assistant. Let's start by entering the customer's details." },
    ]);
    const [customer, setCustomer] = useState<Customer>({ name: '', email: '', phone: '', address: '' });
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '1' });

    const [availableProducts, setAvailableProducts] = useState<AvailableProduct[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setProductsLoading(true);
                const productsFromDb = await getProducts();
                setAvailableProducts(productsFromDb);
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
    }, [toast]);

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
        }
    }

    const handleRemoveProduct = (index: number) => {
        setProducts(prev => prev.filter((_, i) => i !== index));
    }

    const handleFinalize = () => {
        addMessage('bot', "Invoice details are complete. Here is a preview. You can now download it as a PDF.");
        setStep(2);
    }
    
    const downloadPDF = () => {
        const element = document.getElementById('invoice-preview');
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
                       </form>
                    </CardContent>
                     <CardFooter>
                        <Button type="submit" form="customer-form" className="w-full">Continue</Button>
                     </CardFooter>
                </Card>
            )
        }
        if (step === 1) {
            return (
                 <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                            <Button size="icon" onClick={handleAddProduct}><Plus className="h-4 w-4"/></Button>
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
             return (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Invoice Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div id="invoice-preview">
                           <InvoicePreview customer={customer} products={products} subtotal={subtotal} totalGst={totalGst} total={totalAmount} />
                        </div>
                    </CardContent>
                    <CardFooter>
                       <Button onClick={downloadPDF} className="w-full">
                            <Download className="mr-2 h-4 w-4"/> Download PDF
                       </Button>
                    </CardFooter>
                </Card>
             )
        }
        return null;
    };


    return (
        <div className="flex flex-col h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
