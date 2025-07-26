import React from 'react';
import { TemplateProps } from './TemplateProps';

export default function VibrantTemplate({ company, customer, products, subtotal, totalGst, total, invoiceNumber, issueDate, dueDate }: TemplateProps) {
  console.log('VibrantTemplate props:', { company, issueDate, dueDate });
  return (
    <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-100 p-10 rounded-2xl shadow-lg w-full max-w-2xl mx-auto font-sans border-4 border-pink-400">
      <div className="flex flex-col items-center mb-8 border-2 border-pink-400 bg-pink-50 p-2 rounded-lg">
        <div className="h-16 w-44 mb-2">
          {company.logo ? (
            <img src={company.logo} alt="Logo" className="h-full w-full object-contain rounded-lg" />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-pink-400 to-yellow-300 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow">
              Logo
            </div>
          )}
        </div>
        <h1 className="text-4xl font-extrabold text-pink-700 mb-1 drop-shadow">{company.name}</h1>
        <div className="text-base text-orange-700 mb-1 font-medium">{company.address}</div>
        <div className="text-base text-pink-700 mb-1 font-medium">{company.email} | {company.phone}</div>
        <div className="text-base text-pink-700 font-medium">GST: {company.gst}</div>
      </div>
      <div className="flex justify-between mb-8">
        <div className="bg-pink-100 rounded-lg p-4 w-[48%] shadow">
          <div className="font-bold text-pink-700 mb-1">Invoice Date: {issueDate}</div>
          <div className="font-bold text-pink-700 mb-1">Bill To:</div>
          <div className="font-semibold text-pink-900">{customer.name}</div>
          <div className="text-sm text-pink-700">{customer.email}</div>
          <div className="text-sm text-pink-700">{customer.phone}</div>
          <div className="text-sm text-pink-700">{customer.address}</div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 w-[48%] shadow">
          <div className="font-bold text-yellow-700 mb-1">Due Date: {dueDate}</div>
          <div className="font-bold text-yellow-700 mb-1">Ship To:</div>
          <div className="font-semibold text-yellow-900">{customer.name}</div>
          <div className="text-sm text-yellow-700">{customer.email}</div>
          <div className="text-sm text-yellow-700">{customer.phone}</div>
          <div className="text-sm text-yellow-700">{customer.address}</div>
        </div>
      </div>
      <table className="w-full mb-8 text-base rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-pink-400 to-yellow-300 text-white">
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-right">Qty</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-right">Tax (%)</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-pink-50' : 'bg-yellow-50'}>
              <td className="p-3 font-medium text-pink-900">{p.name}</td>
              <td className="p-3 text-right text-pink-700">{p.quantity}</td>
              <td className="p-3 text-right text-pink-700">₹{p.price.toFixed(2)}</td>
              <td className="p-3 text-right text-pink-700">{p.tax}</td>
              <td className="p-3 text-right text-pink-900 font-bold">₹{(p.price * p.quantity * (1 + p.tax / 100)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <div className="w-72 bg-white rounded-lg p-4 shadow-lg">
          <div className="flex justify-between mb-2 text-pink-700 font-semibold">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-yellow-700 font-semibold">
            <span>GST</span>
            <span>₹{totalGst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-3 text-pink-900">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 