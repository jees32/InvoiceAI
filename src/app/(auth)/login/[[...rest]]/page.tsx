'use client';

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary hover:bg-primary/90',
            card: 'shadow-lg',
          }
        }}
        signUpUrl="/signup"
        redirectUrl="/dashboard"
      />
    </div>
  );
}