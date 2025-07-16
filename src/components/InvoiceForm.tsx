import type { InvoiceData } from '@/types/invoice'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'

interface InvoiceFormProps {
  invoiceData: InvoiceData
  onDataChange: (data: Partial<InvoiceData>) => void
}

export default function InvoiceForm({ invoiceData, onDataChange }: InvoiceFormProps) {
  const handleInputChange = (field: keyof InvoiceData, value: string | number) => {
    onDataChange({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            value={invoiceData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Your Company Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            type="text"
            value={invoiceData.invoiceNumber}
            onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            placeholder="INV-001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            type="text"
            value={invoiceData.clientName}
            onChange={(e) => handleInputChange('clientName', e.target.value)}
            placeholder="Client Name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceDate">Date</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={invoiceData.invoiceDate}
              onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
                id="price"
                type="number"
                value={invoiceData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                placeholder="1000"
            />
            </div>
             <div className="space-y-2">
                <Label htmlFor="paidAmount">Paid Amount (₹)</Label>
                <Input
                    id="paidAmount"
                    type="number"
                    value={invoiceData.paidAmount}
                    onChange={(e) => handleInputChange('paidAmount', parseFloat(e.target.value) || 0)}
                    placeholder="500"
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="vatPercentage">VAT (%)</Label>
                <Input
                    id="vatPercentage"
                    type="number"
                    value={invoiceData.vatPercentage}
                    onChange={(e) => handleInputChange('vatPercentage', parseFloat(e.target.value) || 0)}
                    placeholder="12"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="gstinPercentage">GSTIN (%)</Label>
                <Input
                    id="gstinPercentage"
                    type="number"
                    value={invoiceData.gstinPercentage}
                    onChange={(e) => handleInputChange('gstinPercentage', parseFloat(e.target.value) || 0)}
                    placeholder="18"
                />
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
