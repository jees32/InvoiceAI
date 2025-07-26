import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }
  const [revenue, invoiceCount, clientList, pendingCount, recentInvoices] = await Promise.all([
    prisma.invoice.aggregate({ _sum: { totalAmount: true }, where: { userId } }),
    prisma.invoice.count({ where: { userId } }),
    prisma.invoice.findMany({ where: { userId }, select: { customerEmail: true } }),
    prisma.invoice.count({ where: { userId, status: 'Pending' } }),
    prisma.invoice.findMany({ where: { userId }, orderBy: { issueDate: 'desc' }, take: 5 }),
  ]);
  const uniqueClients = new Set(clientList.map(i => i.customerEmail)).size;
  return NextResponse.json({
    revenue: revenue._sum.totalAmount || 0,
    invoiceCount,
    uniqueClients,
    pendingCount,
    recentInvoices,
  });
} 