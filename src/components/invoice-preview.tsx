import { Separator } from "./ui/separator";

type InvoicePreviewProps = {
  customer: { name: string; email: string; phone: string; address: string };
  products: { name: string; quantity: number; price: number; tax: number }[];
  subtotal: number;
  totalGst: number;
  total: number;
};

export function InvoicePreview({ customer, products, subtotal, totalGst, total }: InvoicePreviewProps) {
  const invoiceNumber = `INV-${String(Date.now()).slice(-6)}`;
  const invoiceDate = new Date().toLocaleDateString('en-IN');
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg border font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">INVOICE</h1>
          <p className="text-gray-500">Invoice #: {invoiceNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">InvoicePilot Corp</h2>
          <p>123 Business Rd.</p>
          <p>Business City, 12345</p>
          <p>support@invoicepilot.com</p>
        </div>
      </div>

      {/* Bill To & Dates */}
      <div className="flex justify-between mb-8">
        <div>
          <h3 className="font-semibold mb-2 text-gray-600">BILL TO</h3>
          <p className="font-bold">{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="font-semibold">Invoice Date: </span>
            <span>{invoiceDate}</span>
          </div>
          <div>
            <span className="font-semibold">Due Date: </span>
            <span>{dueDate}</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6 text-center">Quantity</th>
              <th className="py-3 px-6 text-center">Unit Price</th>
              <th className="py-3 px-6 text-center">GST (%)</th>
              <th className="py-3 px-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-medium">{product.name}</td>
                <td className="py-3 px-6 text-center">{product.quantity}</td>
                <td className="py-3 px-6 text-center">₹{product.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-center">{product.tax.toFixed(1)}%</td>
                <td className="py-3 px-6 text-right">₹{(product.quantity * product.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mt-8">
        <div className="w-full max-w-sm">
          <div className="flex justify-between text-gray-600 py-1">
            <p>Subtotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-600 py-1">
            <p>Total GST</p>
            <p>₹{totalGst.toFixed(2)}</p>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg text-primary py-1">
            <p>TOTAL</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-500 text-xs">
        <p>Thank you for your business!</p>
        <p>Please make payments to: Bank Name, Account #123456789</p>
      </div>
    </div>
  );
}
