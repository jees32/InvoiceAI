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

export default function MinimalTemplate({ data }: { data: InvoiceData }) {
  return (
    <div className="bg-gray-50 p-8 font-sans">
      <div className="bg-white rounded p-8 max-w-4xl mx-auto border border-gray-200">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-light text-gray-800">{data.companyName}</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Invoice</p>
            <p className="text-xl font-medium text-gray-800">{data.invoiceNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Bill To</p>
            <p className="text-gray-800 font-medium">{data.clientName}</p>
            <p className="text-gray-600 text-sm">123 Minimal Street</p>
            <p className="text-gray-600 text-sm">Clean City, CC 11111</p>
          </div>
          <div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Date</span>
                <span className="text-gray-800">{data.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Due Date</span>
                <span className="text-gray-800">{data.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        <table className="w-full text-left table-auto">
            <thead>
                <tr className="border-b-2 border-t-2 border-gray-200 bg-gray-50">
                <th className="p-2 text-left font-normal text-xs uppercase text-gray-500">No</th>
                <th className="p-2 text-left font-normal text-xs uppercase text-gray-500">Item</th>
                <th className="p-2 text-right font-normal text-xs uppercase text-gray-500">Rate</th>
                <th className="p-2 text-right font-normal text-xs uppercase text-gray-500">Quantity</th>
                <th className="p-2 text-right font-normal text-xs uppercase text-gray-500">Taxable Value</th>
                <th className="p-2 text-right font-normal text-xs uppercase text-gray-500">Tax Amount</th>
                <th className="p-2 text-right font-normal text-xs uppercase text-gray-500">Amount</th>
                </tr>
            </thead>
            <tbody>
                {mockedItems.map((item) => (
                    <tr key={item.no} className="border-b border-gray-100">
                        <td className="p-3 text-sm">{item.no}</td>
                        <td className="p-3 text-sm">
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-600">HSN: {item.hsn}</p>
                        </td>
                        <td className="p-3 text-sm text-right">₹{item.rate.toFixed(2)}</td>
                        <td className="p-3 text-sm text-right">{item.quantity}</td>
                        <td className="p-3 text-sm text-right">₹{item.taxableValue.toFixed(2)}</td>
                        <td className="p-3 text-sm text-right">₹{item.taxAmount.toFixed(2)}</td>
                        <td className="p-3 text-sm text-right font-semibold text-gray-900">₹{item.amount.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="flex justify-end mt-8">
            <div className="w-2/5 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-600">
                        <span>Taxable Amount</span>
                        <span>₹{totalTaxableAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>IGST ({mockedItems[0].taxPercentage}%)</span>
                        <span>₹{totalTaxAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between font-bold text-gray-800 text-base">
                        <span>Total</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}
