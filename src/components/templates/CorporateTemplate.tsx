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


export default function CorporateTemplate({ data }: { data: InvoiceData }) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 font-sans">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="border-l-8 border-indigo-600 pl-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-800">{data.companyName}</h1>
              <p className="text-indigo-600 font-medium">Corporate Services Division</p>
            </div>
            <div className="bg-indigo-600 text-white p-4 rounded">
              <p className="text-sm font-semibold">INVOICE</p>
              <p className="text-xl font-bold">{data.invoiceNumber}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4">
              <h3 className="font-semibold text-indigo-800 mb-3">Billing Address</h3>
              <p className="font-medium text-indigo-700">{data.clientName}</p>
              <p className="text-indigo-600">789 Corporate Plaza</p>
              <p className="text-indigo-600">Suite 100</p>
              <p className="text-indigo-600">Business District, BD 13579</p>
            </div>
          </div>
          <div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h3 className="font-semibold text-indigo-800 mb-3">Payment Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-indigo-600">Invoice Date:</span>
                  <span className="font-semibold text-indigo-800">{data.invoiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-600">Payment Due:</span>
                  <span className="font-semibold text-indigo-800">{data.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-600">Terms:</span>
                  <span className="font-semibold text-indigo-800">Net 30 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <table className="w-full text-left table-auto border-collapse">
            <thead>
                <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-sm font-semibold">No</th>
                <th className="p-3 text-sm font-semibold">Item</th>
                <th className="p-3 text-sm font-semibold text-right">Rate</th>
                <th className="p-3 text-sm font-semibold text-right">Quantity</th>
                <th className="p-3 text-sm font-semibold text-right">Taxable Value</th>
                <th className="p-3 text-sm font-semibold text-right">Tax Amount</th>
                <th className="p-3 text-sm font-semibold text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                {mockedItems.map((item) => (
                    <tr key={item.no} className="border-b border-indigo-100">
                        <td className="p-3">{item.no}</td>
                        <td className="p-3">
                            <p className="font-semibold text-indigo-800">{item.name}</p>
                            <p className="text-xs text-indigo-600">HSN: {item.hsn}</p>
                        </td>
                        <td className="p-3 text-right">₹{item.rate.toFixed(2)}</td>
                        <td className="p-3 text-right">{item.quantity}</td>
                        <td className="p-3 text-right">₹{item.taxableValue.toFixed(2)}</td>
                        <td className="p-3 text-right">₹{item.taxAmount.toFixed(2)}</td>
                        <td className="p-3 text-right font-bold text-indigo-700">₹{item.amount.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="flex justify-end mt-6">
            <div className="w-2/5">
                <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex justify-between text-indigo-700">
                        <span>Taxable Amount</span>
                        <span>₹{totalTaxableAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-indigo-700">
                        <span>IGST ({mockedItems[0].taxPercentage}%)</span>
                        <span>₹{totalTaxAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-indigo-200 my-2"></div>
                    <div className="flex justify-between font-bold text-xl text-indigo-800">
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
