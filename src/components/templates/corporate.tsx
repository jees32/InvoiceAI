import React from 'react';
import { TemplateProps } from './TemplateProps';

export default function CorporateTemplate({ customer, products, subtotal, totalGst, total, invoiceNumber, issueDate, dueDate }: TemplateProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
          <div className="text-sm text-gray-500 mt-2">{invoiceNumber}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Issue Date: {issueDate}</div>
          <div className="text-sm text-gray-500">Due Date: {dueDate}</div>
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold text-gray-700">Billed To:</div>
        <div>{customer.name}</div>
        <div className="text-sm text-gray-500">{customer.email}</div>
        <div className="text-sm text-gray-500">{customer.phone}</div>
        <div className="text-sm text-gray-500">{customer.address}</div>
      </div>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-right">Qty</th>
            <th className="p-2 text-right">Price</th>
            <th className="p-2 text-right">Tax (%)</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2 text-right">{p.quantity}</td>
              <td className="p-2 text-right">₹{p.price.toFixed(2)}</td>
              <td className="p-2 text-right">{p.tax}</td>
              <td className="p-2 text-right">₹{(p.price * p.quantity * (1 + p.tax / 100)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">GST</span>
            <span>₹{totalGst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 