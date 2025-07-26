export interface TemplateProps {
  company: {
    name: string;
    address: string;
    email: string;
    phone: string;
    gst: string;
    logo?: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: Array<{
    name: string;
    quantity: number;
    price: number;
    tax: number;
  }>;
  subtotal: number;
  totalGst: number;
  total: number;
  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;
} 