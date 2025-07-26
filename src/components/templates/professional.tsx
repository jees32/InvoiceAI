import React from 'react';
import { TemplateProps } from './TemplateProps';

export default function ProfessionalTemplate({ customer, products, subtotal, totalGst, total, invoiceNumber, issueDate, dueDate }: TemplateProps) {
  return (
    <div className="bg-white p-10 rounded-lg border-2 border-gray-300 w-full max-w-2xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
          <div className="text-xs text-gray-400 mt-1">{invoiceNumber}</div>
        </div>
        <div className="text-right text-gray-700">
          <div className="text-xs">Issued: {issueDate}</div>
          <div className="text-xs">Due: {dueDate}</div>
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold text-gray-900">To:</div>
        <div>{customer.name}</div>
        <div className="text-xs text-gray-500">{customer.email}</div>
        <div className="text-xs text-gray-500">{customer.phone}</div>
        <div className="text-xs text-gray-500">{customer.address}</div>
      </div>
      <table className="w-full mb-6 text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-900">
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
            <span className="text-gray-700">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">GST</span>
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