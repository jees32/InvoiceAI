# InvoicePilot

This is a NextJS invoice generation application with AI-powered conversational interface.

## Features

- AI-Powered Conversational Interface for invoice creation
- User Authentication using Clerk
- Database operations with Prisma
- Invoice Preview and PDF generation
- Product management
- Multiple invoice templates

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file with your configuration:
```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL="file:./dev.db"

# Google AI (for AI features)
GOOGLE_GENAI_API_KEY=your_google_ai_api_key
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 15
- **Authentication**: Clerk
- **Database**: Prisma with SQLite
- **UI**: Tailwind CSS + shadcn/ui
- **AI**: Google Generative AI
- **PDF Generation**: html2pdf.js

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and configurations
- `/src/ai` - AI flows and configurations
- `/prisma` - Database schema and migrations