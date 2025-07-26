import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Destructure invoice and items
    const { invoice, items } = data;
    if (!invoice || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    // Create the invoice
    const createdInvoice = await prisma.invoice.create({
      data: {
        invoiceNumber: invoice.invoiceNumber,
        customerName: invoice.customerName,
        customerEmail: invoice.customerEmail,
        customerPhone: invoice.customerPhone,
        customerAddress: invoice.customerAddress,
        issueDate: new Date(invoice.issueDate),
        dueDate: new Date(invoice.dueDate),
        status: invoice.status,
        subtotal: invoice.subtotal,
        totalGst: invoice.totalGst,
        totalAmount: invoice.totalAmount,
        userId: invoice.userId,
        profileId: invoice.profileId,
        items: {
          create: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            tax: item.tax,
          })),
        },
      },
      include: { items: true },
    });
    return NextResponse.json({ invoice: createdInvoice });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 