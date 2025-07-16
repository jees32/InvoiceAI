import type { InvoiceData } from '@/types/invoice'

const mockedItems = [
    {
        no: 1,
        name: 'Samsung Galaxy F23',
        hsn: '8517',
        quantity: 1,
        rate: 14405.93,
        taxableValue: 14405.93,
        taxAmount: 2593.07,
        taxPercentage: 18,
        amount: 16999.00
    },
    {
        no: 2,
        name: 'Samsung 45 Watt Travel Adapter',
        hsn: '8504',
        quantity: 1,
        rate: 2117.80,
        taxableValue: 2117.80,
        taxAmount: 381.20,
        taxPercentage: 18,
        amount: 2499.00
    }
];

const totalTaxableAmount = mockedItems.reduce((acc, item) => acc + item.taxableValue, 0);
const totalTaxAmount = mockedItems.reduce((acc, item) => acc + item.taxAmount, 0);
const totalAmount = mockedItems.reduce((acc, item) => acc + item.amount, 0);

export default function ProfessionalTemplate({ data }: { data: InvoiceData }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 font-sans">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="border-b-2 border-green-500 pb-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-700">{data.companyName}</h1>
              <p className="text-green-600 mt-1">Professional Business Solutions</p>
            </div>
            <div className="text-right">
              <div className="bg-green-600 text-white px-6 py-3 rounded">
                <p className="text-sm uppercase">Invoice</p>
                <p className="text-xl font-bold">{data.invoiceNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">From:</h3>
            <p className="font-medium">{data.companyName}</p>
            <p className="text-green-600 text-sm">456 Business Blvd</p>
            <p className="text-green-600 text-sm">Business City, BC 54321</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">To:</h3>
            <p className="font-medium">{data.clientName}</p>
            <p className="text-green-600 text-sm">789 Client Road</p>
            <p className="text-green-600 text-sm">Client City, CC 98765</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">Payment Details:</h3>
            <p className="text-sm"><span className="font-medium">Date:</span> {data.invoiceDate}</p>
            <p className="text-sm"><span className="font-medium">Due:</span> {data.dueDate}</p>
            <p className="text-sm"><span className="font-medium">Terms:</span> Net 30</p>
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 text-sm font-semibold rounded-tl-lg">No</th>
              <th className="p-3 text-sm font-semibold">Item</th>
              <th className="p-3 text-sm font-semibold text-right">Rate</th>
              <th className="p-3 text-sm font-semibold text-right">Quantity</th>
              <th className="p-3 text-sm font-semibold text-right">Taxable Value</th>
              <th className="p-3 text-sm font-semibold text-right">Tax Amount</th>
              <th className="p-3 text-sm font-semibold text-right rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockedItems.map((item) => (
                <tr key={item.no} className="border-b border-green-100">
                    <td className="p-3">{item.no}</td>
                    <td className="p-3">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-green-700">HSN: {item.hsn}</p>
                    </td>
                    <td className="p-3 text-right">₹{item.rate.toFixed(2)}</td>
                    <td className="p-3 text-right">{item.quantity}</td>
                    <td className="p-3 text-right">₹{item.taxableValue.toFixed(2)}</td>
                    <td className="p-3 text-right">₹{item.taxAmount.toFixed(2)}</td>
                    <td className="p-3 text-right font-bold text-green-800">₹{item.amount.toFixed(2)}</td>
                </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-green-50 p-4 rounded-lg mb-6 ml-auto max-w-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Taxable Amount:</span>
              <span>₹{totalTaxableAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>IGST ({mockedItems[0].taxPercentage}%):</span>
                <span>₹{totalTaxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-green-200 pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
