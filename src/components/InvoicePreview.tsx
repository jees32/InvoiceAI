import type { InvoiceData, TemplateType } from '@/types/invoice'
import CorporateTemplate from './templates/corporate';
import ElegantTemplate from './templates/elegant';
import ProfessionalTemplate from './templates/professional';
import MinimalTemplate from './templates/minimal';
import ModernTemplate from './templates/modern';
import type { TemplateProps } from './templates/TemplateProps';

interface InvoicePreviewProps {
  invoiceData: InvoiceData
  template: TemplateType
}

function mapInvoiceDataToTemplateProps(invoiceData: InvoiceData): TemplateProps {
  return {
    company: {
      name: invoiceData.companyName || 'Your Company',
      address: 'Company Address', // Default value
      email: 'info@company.com', // Default value
      phone: '+1 234 567 8900', // Default value
      gst: 'GST123456789', // Default value
      logo: '', // Default empty logo
    },
    customer: {
      name: invoiceData.clientName || '',
      email: '', // Not present in InvoiceData
      phone: '', // Not present in InvoiceData
      address: '', // Not present in InvoiceData
    },
    products: [], // Not present in InvoiceData
    subtotal: invoiceData.subtotal || 0,
    totalGst: invoiceData.gstinAmount || 0, // Use gstinAmount as GST
    total: invoiceData.totalAmount || 0,
    invoiceNumber: invoiceData.invoiceNumber,
    issueDate: invoiceData.invoiceDate,
    dueDate: invoiceData.dueDate,
  };
}

export default function InvoicePreview({ invoiceData, template }: InvoicePreviewProps) {
  const props = mapInvoiceDataToTemplateProps(invoiceData);
  switch (template) {
    case 'modern':
      return <ModernTemplate {...props} />;
    case 'elegant':
      return <ElegantTemplate {...props} />;
    case 'professional':
      return <ProfessionalTemplate {...props} />;
    case 'minimal':
      return <MinimalTemplate {...props} />;
    case 'corporate':
      return <CorporateTemplate {...props} />;
    default:
      return <ModernTemplate {...props} />;
  }
}
