'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  // Public landing page, no auth logic for now
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4">Welcome to InvoiceAI</h1>
      <p className="text-lg text-muted-foreground mb-8">Your smart invoicing solution.</p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button size="lg" className="px-8 text-lg font-semibold">Login</Button>
        </Link>
        <Link href="/signup">
          <Button size="lg" variant="outline" className="px-8 text-lg font-semibold">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
