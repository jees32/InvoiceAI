'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from '@/lib/prisma';

const colors = [
  "bg-sky-100", "bg-blue-100", "bg-indigo-100", "bg-violet-100", "bg-purple-100", "bg-fuchsia-100", "bg-pink-100", "bg-rose-100",
  "bg-green-100", "bg-emerald-100", "bg-teal-100", "bg-cyan-100", "bg-yellow-100", "bg-amber-100", "bg-orange-100", "bg-red-100",
  "bg-stone-100", "bg-neutral-100", "bg-zinc-100", "bg-gray-100", "bg-slate-100",
];

export default async function InvoicePoolPage() {
  // TODO: Replace with real user id from session if you want user-specific
  // const userId = 'user-1';
  // const invoices = await prisma.invoice.findMany({ where: { userId } });
  const invoices = await prisma.invoice.findMany({ orderBy: { issueDate: 'desc' } });
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
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Invoice Pool</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className={`border-2 transform hover:scale-105 transition-transform duration-300`}>
            <CardHeader>
              <CardTitle className="text-lg truncate">{invoice.customerName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-xl">₹{invoice.totalAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm text-muted-foreground">{invoice.invoiceNumber}</p>
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
