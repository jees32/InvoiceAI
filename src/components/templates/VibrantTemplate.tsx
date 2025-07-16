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

export default function VibrantTemplate({ data }: { data: InvoiceData }) {
  return (
    <div className="bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 p-8 font-sans">
      <div className="bg-white rounded-xl shadow-xl p-8 border-4 border-orange-300">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-xl mb-6">
            <h1 className="text-4xl font-bold">{data.companyName}</h1>
            <p className="text-orange-100 mt-2">Creative Solutions</p>
          </div>
          <div className="bg-yellow-400 text-orange-800 px-6 py-3 rounded-full inline-block">
            <span className="font-bold text-lg">INVOICE {data.invoiceNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-200 to-red-200 p-6 rounded-xl">
            <h3 className="font-bold text-orange-800 mb-3 text-lg">Client Information</h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold text-orange-700">{data.clientName}</p>
              <p className="text-orange-600">456 Vibrant Ave</p>
              <p className="text-orange-600">Color City, VC 67890</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-200 to-orange-200 p-6 rounded-xl">
            <h3 className="font-bold text-orange-800 mb-3 text-lg">Invoice Details</h3>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-orange-600">Date:</span>
                <span className="font-semibold text-orange-800">{data.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-600">Due:</span>
                <span className="font-semibold text-orange-800">{data.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <th className="p-3 text-sm font-bold rounded-tl-lg">No</th>
                    <th className="p-3 text-sm font-bold">Item</th>
                    <th className="p-3 text-sm font-bold text-right">Rate</th>
                    <th className="p-3 text-sm font-bold text-right">Qty</th>
                    <th className="p-3 text-sm font-bold text-right">Taxable</th>
                    <th className="p-3 text-sm font-bold text-right">Tax</th>
                    <th className="p-3 text-sm font-bold text-right rounded-tr-lg">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockedItems.map((item) => (
                    <tr key={item.no} className="border-b border-orange-100">
                        <td className="p-3">{item.no}</td>
                        <td className="p-3">
                            <p className="font-semibold text-orange-800">{item.name}</p>
                            <p className="text-xs text-orange-600">HSN: {item.hsn}</p>
                        </td>
                        <td className="p-3 text-right">₹{item.rate.toFixed(2)}</td>
                        <td className="p-3 text-right">{item.quantity}</td>
                        <td className="p-3 text-right">₹{item.taxableValue.toFixed(2)}</td>
                        <td className="p-3 text-right">₹{item.taxAmount.toFixed(2)}</td>
                        <td className="p-3 text-right font-bold text-red-600">₹{item.amount.toFixed(2)}</td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>

        <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-6 rounded-xl">
          <div className="flex justify-end text-white mb-4">
            <div className="w-2/5 space-y-2">
                <div className="flex justify-between">
                    <span>Taxable Amount</span>
                    <span>₹{totalTaxableAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>IGST ({mockedItems[0].taxPercentage}%)</span>
                    <span>₹{totalTaxAmount.toFixed(2)}</span>
                </div>
            </div>
          </div>
          <div className="flex justify-between text-white font-bold text-2xl border-t-2 border-orange-200 pt-4">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
