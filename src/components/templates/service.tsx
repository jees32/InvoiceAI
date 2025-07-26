import React from 'react';
import { TemplateProps } from './TemplateProps';

export default function ServiceTemplate({ company, customer, products, subtotal, totalGst, total, invoiceNumber, issueDate, dueDate }: TemplateProps) {
  console.log('ServiceTemplate props:', { company, issueDate, dueDate });
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto font-sans border-2 border-gray-200">
      <div className="flex flex-col items-center mb-8">
        <div className="h-14 w-40 mb-2">
          {company.logo ? (
            <img src={company.logo} alt="Logo" className="h-full w-full object-contain rounded" />
          ) : (
            <div className="h-full w-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
              Logo
            </div>
          )}
        </div>
        <h1 className="text-3xl font-extrabold text-black mb-1">{company.name}</h1>
        <div className="text-sm text-black mb-1">{company.address}</div>
        <div className="text-sm text-black mb-1">{company.email} | {company.phone}</div>
        <div className="text-sm text-black">GST: {company.gst}</div>
      </div>
      <div className="flex justify-between mb-6">
        <div>
          <div className="font-semibold text-black mb-1">Invoice Date: {issueDate}</div>
          <div className="font-semibold text-black mb-1">Bill To:</div>
          <div>{customer.name}</div>
          <div className="text-xs text-gray-600">{customer.email}</div>
          <div className="text-xs text-gray-600">{customer.phone}</div>
          <div className="text-xs text-gray-600">{customer.address}</div>
        </div>
        <div>
          <div className="font-semibold text-black mb-1">Due Date: {dueDate}</div>
          <div className="font-semibold text-black mb-1">Ship To:</div>
          <div>{customer.name}</div>
          <div className="text-xs text-gray-600">{customer.email}</div>
          <div className="text-xs text-gray-600">{customer.phone}</div>
          <div className="text-xs text-gray-600">{customer.address}</div>
        </div>
      </div>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-50 text-black">
            <th className="p-2 text-left">Service</th>
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
            <span className="text-black">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-black">GST</span>
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