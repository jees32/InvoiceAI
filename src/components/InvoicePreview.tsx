import type { InvoiceData, TemplateType } from '@/types/invoice'
import ModernTemplate from './templates/ModernTemplate'
import ElegantTemplate from './templates/ElegantTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import VibrantTemplate from './templates/VibrantTemplate'
import CorporateTemplate from './templates/CorporateTemplate'

interface InvoicePreviewProps {
  invoiceData: InvoiceData
  template: TemplateType
}

export default function InvoicePreview({ invoiceData, template }: InvoicePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={invoiceData} />
      case 'elegant':
        return <ElegantTemplate data={invoiceData} />
      case 'professional':
        return <ProfessionalTemplate data={invoiceData} />
      case 'minimal':
        return <MinimalTemplate data={invoiceData} />
      case 'vibrant':
        return <VibrantTemplate data={invoiceData} />
      case 'corporate':
        return <CorporateTemplate data={invoiceData} />
      default:
        return <ModernTemplate data={invoiceData} />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden invoice-preview">
      {renderTemplate()}
    </div>
  )
}
