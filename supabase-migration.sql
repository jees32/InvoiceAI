-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name TEXT,
    gst_number TEXT,
    address TEXT,
    contact_number TEXT,
    support_number TEXT,
    logo_url TEXT,
    default_tax DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for logos bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'logos');
CREATE POLICY "Authenticated users can upload logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update logos" ON storage.objects FOR UPDATE USING (bucket_id = 'logos' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete logos" ON storage.objects FOR DELETE USING (bucket_id = 'logos' AND auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 