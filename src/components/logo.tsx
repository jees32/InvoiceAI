import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <span className="text-3xl font-extrabold tracking-tight text-primary drop-shadow-sm select-none" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
        Invoice<span className="text-blue-600">Pilot</span>
      </span>
    </div>
  );
}
