# Supabase Setup Guide

This guide will help you set up Supabase for your invoice application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy your **Project URL** and **anon public key**
3. Update your `.env.local` file with these values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-migration.sql` into the editor
3. Click **Run** to execute the migration

This will create:
- A `profiles` table for storing company profile data
- A `logos` storage bucket for company logos
- Appropriate storage policies for file access

## 4. Configure Storage Policies (Optional)

If you want to restrict access to uploaded files, you can modify the storage policies in the SQL migration file. The current setup allows:
- Public read access to logos
- Authenticated users can upload, update, and delete logos

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the profile page
3. Try updating your company profile information
4. Upload a company logo
5. Save the changes

The data should now be saved to your Supabase database and the logo should be stored in Supabase Storage.

## Troubleshooting

### Environment Variables Not Working
- Make sure your `.env.local` file is in the root directory
- Restart your development server after adding environment variables
- Check that the variable names start with `NEXT_PUBLIC_`

### Database Connection Issues
- Verify your Supabase URL and anon key are correct
- Check that your Supabase project is active
- Ensure the database migration has been run successfully

### File Upload Issues
- Verify the `logos` storage bucket exists
- Check that the storage policies are properly configured
- Ensure your file is an image (JPEG, PNG, JPG)

### Profile Not Saving
- Check the browser console for any error messages
- Verify the `profiles` table exists in your Supabase database
- Check that the table columns match the expected schema 