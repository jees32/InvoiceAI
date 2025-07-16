'use client'

import { useEffect, useState } from 'react'
import InvoiceForm from '@/components/InvoiceForm'
import InvoicePreview from '@/components/InvoicePreview'
import TemplateSelector from '@/components/TemplateSelector'
import type { InvoiceData, TemplateType } from '@/types/invoice'
import { getTemplates, seedTemplates, type Template } from '@/app/actions/templates'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function InvoiceTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern')
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: 'InvoicePilot Corp',
    invoiceNumber: 'INV-2024-001',
    clientName: 'Client Company',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    price: 1000.00,
    vatPercentage: 12,
    gstinPercentage: 18,
    paidAmount: 500.00,
    vatAmount: 120.00,
    gstinAmount: 180.00,
    subtotal: 1300.00,
    totalAmount: 1300.00,
    balanceAmount: 800.00
  })
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true)
        const fetchedTemplates = await getTemplates()
        setTemplates(fetchedTemplates)
      } catch (error) {
        console.error("Failed to fetch templates:", error)
        toast({ variant: "destructive", title: "Error", description: "Could not fetch templates." })
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [toast])

  const handleSeed = async () => {
    try {
      const result = await seedTemplates();
      if (result.success) {
        const fetchedTemplates = await getTemplates();
        setTemplates(fetchedTemplates);
        toast({ title: "Success", description: result.message });
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message });
      }
    } catch (error) {
      console.error("Failed to seed templates:", error)
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." })
    }
  }

  const updateInvoiceData = (data: Partial<InvoiceData>) => {
    setInvoiceData(prev => {
      const updated = { ...prev, ...data }
      
      const vatAmount = (updated.price * updated.vatPercentage) / 100
      const gstinAmount = (updated.price * updated.gstinPercentage) / 100
      const subtotal = updated.price + vatAmount + gstinAmount
      const totalAmount = subtotal
      const balanceAmount = totalAmount - updated.paidAmount

      return {
        ...updated,
        vatAmount,
        gstinAmount,
        subtotal,
        totalAmount,
        balanceAmount
      }
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Invoice Templates</h1>
        <p className="text-muted-foreground mt-2">Choose a template, fill in the details, and see your invoice come to life.</p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {!loading && templates.length === 0 && (
          <Card className="max-w-md mx-auto">
              <CardHeader>
                  <CardTitle>Seed Database</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">No invoice templates found in the database. Please seed the initial templates to get started.</p>
                  <Button onClick={handleSeed}>Seed Templates</Button>
              </CardContent>
          </Card>
      )}
      
      {!loading && templates.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
              <TemplateSelector 
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
              />
              
              <InvoiceForm 
                  invoiceData={invoiceData}
                  onDataChange={updateInvoiceData}
              />
          </div>
          
          <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Live Preview</h2>
              <div className="h-[800px] overflow-auto rounded-lg border shadow-lg">
                  <InvoicePreview 
                      invoiceData={invoiceData}
                      template={selectedTemplate}
                  />
              </div>
          </div>
        </div>
      )}
    </div>
  )
}
