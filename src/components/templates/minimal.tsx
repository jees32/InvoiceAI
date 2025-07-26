import React from 'react';
import { TemplateProps } from './TemplateProps';

export default function MinimalTemplate({ company, customer, products, subtotal, totalGst, total, invoiceNumber, issueDate, dueDate }: TemplateProps) {
  console.log('MinimalTemplate props:', { company, issueDate, dueDate });
  return (
    <div className="bg-white p-6 rounded border w-full max-w-2xl mx-auto font-mono">
      <div className="flex flex-col items-center mb-6">
        <div className="h-10 w-32 mb-2">
          {company.logo ? (
            <img src={company.logo} alt="Logo" className="h-full w-full object-contain rounded" />
          ) : (
            <div className="h-full w-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
              Logo
            </div>
          )}
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800 mb-1">{company.name}</h1>
        <div className="text-xs text-gray-600 mb-1">{company.address}</div>
        <div className="text-xs text-gray-600 mb-1">{company.email} | {company.phone}</div>
        <div className="text-xs text-gray-600">GST: {company.gst}</div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <div className="font-semibold text-gray-700 mb-1">Invoice Date: {issueDate}</div>
          <div className="font-semibold text-gray-700 mb-1">Bill To:</div>
          <div>{customer.name}</div>
          <div className="text-xs text-gray-500">{customer.email}</div>
          <div className="text-xs text-gray-500">{customer.phone}</div>
          <div className="text-xs text-gray-500">{customer.address}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 mb-1">Due Date: {dueDate}</div>
          <div className="font-semibold text-gray-700 mb-1">Ship To:</div>
          <div>{customer.name}</div>
          <div className="text-xs text-gray-500">{customer.email}</div>
          <div className="text-xs text-gray-500">{customer.phone}</div>
          <div className="text-xs text-gray-500">{customer.address}</div>
        </div>
      </div>
      <table className="w-full mb-4 text-xs">
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