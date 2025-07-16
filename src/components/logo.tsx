import { cn } from '@/lib/utils';
import Image from 'next/image';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image 
        src="https://placehold.co/180x50.png"
        data-ai-hint="logo pilot"
        alt="InvoicePilot Logo" 
        width={180} 
        height={50}
        priority
      />
    </div>
  );
}
