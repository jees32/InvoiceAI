'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary hover:bg-primary/90',
            card: 'shadow-lg',
          }
        }}
        signInUrl="/login"
        redirectUrl="/dashboard"
      />
    </div>
  );
}