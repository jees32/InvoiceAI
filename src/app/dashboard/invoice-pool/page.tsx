'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const colors = [
  "bg-sky-100", "bg-blue-100", "bg-indigo-100", "bg-violet-100", "bg-purple-100", "bg-fuchsia-100", "bg-pink-100", "bg-rose-100",
  "bg-green-100", "bg-emerald-100", "bg-teal-100", "bg-cyan-100", "bg-yellow-100", "bg-amber-100", "bg-orange-100", "bg-red-100",
  "bg-stone-100", "bg-neutral-100", "bg-zinc-100", "bg-gray-100", "bg-slate-100",
];

const invoices = Array.from({ length: 25 }, (_, i) => ({
  id: `INV${String(2024001 + i)}`,
  customer: `Customer ${String.fromCharCode(65 + (i % 26))}`,
  amount: (Math.random() * 5000 + 500).toFixed(2),
  status: ["Paid", "Pending", "Unpaid"][i % 3],
  color: colors[i % colors.length],
  style: {
    border: `border-${['blue', 'green', 'purple', 'red', 'yellow'][i % 5]}-500`,
    shadow: `shadow-${['md', 'lg', 'xl'][i % 3]}`,
  }
}));

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-500/20 text-green-700 hover:bg-green-500/30";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30";
    case "Unpaid":
      return "bg-red-500/20 text-red-700 hover:bg-red-500/30";
    default:
      return "secondary";
  }
};


export default function InvoicePoolPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Invoice Pool</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className={`${invoice.color} ${invoice.style.border} ${invoice.style.shadow} border-2 transform hover:scale-105 transition-transform duration-300`}>
            <CardHeader>
              <CardTitle className="text-lg truncate">{invoice.customer}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-xl">₹{invoice.amount}</p>
              <p className="text-sm text-muted-foreground">{invoice.id}</p>
              <Badge variant="outline" className={`mt-4 ${getStatusVariant(invoice.status)}`}>
                {invoice.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
