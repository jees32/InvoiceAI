import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log('Upsert user data:', data); // Debug log
  if (!data.id || !data.email) {
    return NextResponse.json({ error: 'Missing user id or email' }, { status: 400 });
  }
  try {
    const user = await prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        imageUrl: data.imageUrl || '',
      },
      create: {
        id: data.id,
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        imageUrl: data.imageUrl || '',
      },
    });
    return NextResponse.json({ user });
  } catch (error: any) {
    console.log('Upsert user error:', error);
    // If unique constraint failed on email, fetch the existing user by email
    if (error.code === 'P2002' && error.meta && error.meta.target && error.meta.target.includes('email')) {
      const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingUser) {
        return NextResponse.json({ user: existingUser });
      }
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 