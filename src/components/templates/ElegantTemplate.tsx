import type { InvoiceData } from '@/types/invoice'

const mockedItems = [
    {
        no: 1,
        name: 'Samsung Galaxy F23',
        hsn: '8517',
        description: 'Color Aqua Green, 128 GB',
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
        description: 'EP-TA845XBNGIN, Color - Black',
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


export default function ElegantTemplate({ data }: { data: InvoiceData }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 font-elegant">
      <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-purple-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl text-purple-600 mb-2">{data.companyName}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4"></div>
          <p className="text-purple-500 uppercase tracking-widest text-sm">Invoice</p>
        </div>

        <div className="flex justify-between mb-8">
          <div className="bg-purple-50 p-6 rounded-lg flex-1 mr-4">
            <h3 className="font-semibold text-purple-700 mb-3">Invoice Details</h3>
            <p><span className="text-purple-600">Number:</span> {data.invoiceNumber}</p>
            <p><span className="text-purple-600">Date:</span> {data.invoiceDate}</p>
            <p><span className="text-purple-600">Due:</span> {data.dueDate}</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg flex-1 ml-4">
            <h3 className="font-semibold text-purple-700 mb-3">Bill To</h3>
            <p className="font-medium text-purple-800">{data.clientName}</p>
            <p className="text-purple-600">123 Client Avenue</p>
            <p className="text-purple-600">City, State 12345</p>
          </div>
        </div>

        <div className="mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
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
                    <tr key={item.no} className="border-b border-purple-100">
                        <td className="p-3">{item.no}</td>
                        <td className="p-3">
                            <p className="font-semibold text-purple-800">{item.name}</p>
                            <p className="text-xs text-purple-600">HSN: {item.hsn}</p>
                        </td>
                        <td className="p-3 text-right">₹{item.rate.toFixed(2)}</td>
                        <td className="p-3 text-right">{item.quantity}</td>
                        <td className="p-3 text-right">₹{item.taxableValue.toFixed(2)}</td>
                        <td className="p-3 text-right">₹{item.taxAmount.toFixed(2)}</td>
                        <td className="p-3 text-right font-bold text-purple-700">₹{item.amount.toFixed(2)}</td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>
        
        <div className="flex justify-end">
            <div className="w-2/5">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <div className="flex justify-between text-purple-700">
                        <span>Taxable Amount</span>
                        <span>₹{totalTaxableAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-purple-700">
                        <span>IGST ({mockedItems[0].taxPercentage}%)</span>
                        <span>₹{totalTaxAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-purple-200 my-2"></div>
                    <div className="flex justify-between font-bold text-xl text-purple-800">
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
