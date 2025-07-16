export interface InvoiceData {
  companyName: string
  invoiceNumber: string
  clientName: string
  invoiceDate: string
  dueDate: string
  price: number
  vatPercentage: number
  vatAmount: number
  gstinPercentage: number
  gstinAmount: number
  subtotal: number
  totalAmount: number
  paidAmount: number
  balanceAmount: number
}

export type TemplateType = 'modern' | 'elegant' | 'professional' | 'minimal' | 'vibrant' | 'corporate'
