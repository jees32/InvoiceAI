import type { InvoiceData } from '@/types/invoice'
import Image from 'next/image'

const mockedItems = [
    {
        no: 1,
        name: 'Samsung Galaxy F23',
        hsn: '8517',
        description: 'Color Aqua Green\nStorage - 128 GB\nRam - 6 GB',
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
        description: 'EP-TA845XBNGIN\nColor - Black',
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

export default function ModernTemplate({ data }: { data: InvoiceData }) {
  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="font-bold text-blue-600 text-lg">TAX INVOICE</h1>
          <h2 className="font-bold text-2xl mt-2">{data.companyName}</h2>
          <p className="w-64">Q-city, 2nd Floor-Block A & Block B Survey Number-109,110,111/2, Nanakramguda Village Serlingampalyy Mandal, Ranga Reddy Dist. Hyderabad, TELANGANA, 500032</p>
          <p>Mobile: 9999999999 Email: Swipe@getswipe.in</p>
        </div>
        <div className="text-right">
          <p className="text-xs">ORIGINAL FOR RECIPIENT</p>
          <Image data-ai-hint="amazon logo" src="https://placehold.co/150x50.png" alt="Company Logo" width={120} height={40} className="mt-2 ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 my-6 border-y-2 border-gray-300 py-2">
        <div><span className="font-bold">Invoice #:</span> {data.invoiceNumber}</div>
        <div><span className="font-bold">Invoice Date:</span> {data.invoiceDate}</div>
        <div><span className="font-bold">Due Date:</span> {data.dueDate}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h3 className="font-bold mb-1">Customer Details:</h3>
          <p>{data.clientName}</p>
          <p>Ph: 9999999999</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Billing address:</h3>
          <p className="whitespace-pre-line">Babuganj, Hasanganj{"\n"}Lucknow, UTTARPRADESH, 226007</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Shipping address:</h3>
          <p className="whitespace-pre-line">Babuganj, Hasanganj{"\n"}Lucknow, UTTARPRADESH, 226007</p>
        </div>
      </div>
       <p className="mb-4"><span className="font-bold">Place of Supply:</span> 09-UTTARPRADESH</p>

      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-y-2 border-gray-300 bg-gray-50">
            <th className="p-2 font-bold text-sm">#</th>
            <th className="p-2 font-bold text-sm">Item</th>
            <th className="p-2 font-bold text-sm text-right">Rate/Item</th>
            <th className="p-2 font-bold text-sm text-right">Qty</th>
            <th className="p-2 font-bold text-sm text-right">Taxable Value</th>
            <th className="p-2 font-bold text-sm text-right">Tax Amount</th>
            <th className="p-2 font-bold text-sm text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {mockedItems.map((item) => (
            <tr key={item.no} className="border-b">
              <td className="p-2">{item.no}</td>
              <td className="p-2">
                <p className="font-bold">{item.name}</p>
                <p className="text-xs text-gray-600">HSN: {item.hsn}</p>
                <p className="text-xs text-gray-500 whitespace-pre-line">{item.description}</p>
              </td>
              <td className="p-2 text-right">₹{item.rate.toFixed(2)}</td>
              <td className="p-2 text-right">{item.quantity}</td>
              <td className="p-2 text-right">₹{item.taxableValue.toFixed(2)}</td>
              <td className="p-2 text-right">₹{item.taxAmount.toFixed(2)} ({item.taxPercentage}%)</td>
              <td className="p-2 text-right font-bold">₹{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <div className="w-2/5">
          <div className="flex justify-between py-1">
            <span className="font-bold">Taxable Amount</span>
            <span>₹{totalTaxableAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-bold">IGST 18.0%</span>
            <span>₹{totalTaxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t-2 border-gray-300 pt-2 mt-2">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

       <div className="border-t-2 border-gray-300 mt-4 pt-2">
         <p className="font-bold">Total amount (in words): <span className="font-normal">INR Nineteen Thousand, Four Hundred And Ninety-Eight Rupees Only.</span></p>
         <div className="flex justify-between font-bold text-lg mt-2 bg-gray-100 p-2 rounded-md">
           <span>Amount Payable:</span>
           <span>₹{totalAmount.toFixed(2)}</span>
         </div>
       </div>

      <div className="flex justify-between items-start mt-8 pt-4 border-t-2 border-gray-200">
        <div>
          <h3 className="font-bold mb-2">Pay using UPI:</h3>
          <Image data-ai-hint="qr code" src="https://placehold.co/100x100.png" alt="QR Code" width={100} height={100} />
        </div>
        <div>
          <h3 className="font-bold mb-2">Bank Details:</h3>
          <p><span className="font-semibold">Bank:</span> YES BANK</p>
          <p><span className="font-semibold">Account #:</span> 6678999222445</p>
          <p><span className="font-semibold">IFSC:</span> YESBBIN4567</p>
          <p><span className="font-semibold">Branch:</span> Kodihalli</p>
        </div>
        <div className="text-center">
            <p className="mb-2">For {data.companyName}</p>
            <Image data-ai-hint="signature stamp" src="https://placehold.co/100x100.png" alt="Signature" width={80} height={80} className="mx-auto" />
            <p className="mt-2 font-bold">Authorized Signatory</p>
        </div>
      </div>
      
      <div className="mt-8 text-xs text-gray-600">
        <h3 className="font-bold text-sm text-gray-800 mb-1">Notes:</h3>
        <p>Thank you for the Business</p>
        <h3 className="font-bold text-sm text-gray-800 mt-4 mb-1">Terms and Conditions:</h3>
        <ol className="list-decimal list-inside space-y-1">
            <li>Goods once sold cannot be taken back or exchanged.</li>
            <li>We are not the manufacturers, company will stand for warranty as per their terms and conditions.</li>
            <li>Interest @24% p.a. will be charged for uncleared bills beyond 15 days.</li>
            <li>Subject to local Jurisdiction.</li>
        </ol>
      </div>

    </div>
  )
}
