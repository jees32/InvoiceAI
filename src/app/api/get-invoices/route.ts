import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }
  const invoices = await prisma.invoice.findMany({
    where: { userId },
    orderBy: { issueDate: 'desc' },
  });
  return NextResponse.json({ invoices });
} 