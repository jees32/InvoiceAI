# Clerk Setup Guide

This guide will help you set up Clerk authentication for your invoice application.

## 1. Create a Clerk Account

1. Go to [clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application
3. Choose your preferred authentication methods (email/password, Google, etc.)

## 2. Get Your API Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** and **Secret Key**
3. Create a `.env.local` file in your project root and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 3. Configure Authentication Settings

1. In your Clerk dashboard, go to **User & Authentication** > **Email, Phone, Username**
2. Configure your preferred sign-in methods
3. Go to **Paths** and set:
   - Sign-in URL: `/login`
   - Sign-up URL: `/signup`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/dashboard`

## 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/login` to test sign-in
3. Navigate to `/signup` to test sign-up
4. Try accessing `/dashboard` - you should be redirected to login if not authenticated

## 5. Customization (Optional)

You can customize the appearance of Clerk components by modifying the `appearance` prop in the SignIn and SignUp components located in:
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`

## Environment Variables

Make sure your `.env.local` file includes:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Configuration (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google AI (existing)
GOOGLE_GENAI_API_KEY=your_google_ai_api_key
```

## Troubleshooting

### Environment Variables Not Working
- Make sure your `.env.local` file is in the root directory
- Restart your development server after adding environment variables
- Check that the Clerk keys are correct and from the right environment

### Authentication Not Working
- Verify your Clerk application is active
- Check that the redirect URLs are configured correctly
- Ensure middleware is properly set up

### Protected Routes Not Working
- Check that `src/middleware.ts` is in the correct location
- Verify the route patterns in the middleware match your protected routes