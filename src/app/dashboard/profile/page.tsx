'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getProfile, updateProfile, type CompanyProfile } from "@/app/actions/profile";
import { supabase } from "@/lib/supabase";

const defaultProfile: CompanyProfile = {
    companyName: '',
    gstNumber: '',
    address: '',
    contactNumber: '',
    supportNumber: '',
    logoUrl: '',
    defaultTax: 0,
};

export default function ProfilePage() {
    const { toast } = useToast();
    const [profile, setProfile] = useState<CompanyProfile>(defaultProfile);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            setIsLoading(true);
            const data = await getProfile();
            if (data) {
                setProfile(data);
                if (data.logoUrl) {
                    setLogoPreview(data.logoUrl);
                }
            }
            setIsLoading(false);
        }
        fetchProfile();
    }, []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
        maxFiles: 1,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProfile(prev => ({ ...prev, [id]: value }));
    };
    
    const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile(prev => ({ ...prev, defaultTax: parseFloat(e.target.value) || 0 }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        let updatedProfileData = { ...profile };

        try {
            if (logoFile) {
                const fileName = `${Date.now()}_${logoFile.name}`;
                const { data, error } = await supabase.storage
                    .from('logos')
                    .upload(fileName, logoFile);

                if (error) {
                    throw new Error(`Failed to upload logo: ${error.message}`);
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('logos')
                    .getPublicUrl(fileName);

                updatedProfileData.logoUrl = publicUrl;
            }

            const result = await updateProfile(updatedProfileData);
            
            if (result.success) {
                toast({
                    title: "Profile Saved",
                    description: "Your company profile has been updated successfully.",
                });
            } else {
                 toast({ variant: "destructive", title: "Error", description: result.message });
            }
        } catch (error) {
            console.error("Failed to save profile:", error);
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred while saving." });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
             <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Update your company's information and branding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" placeholder="Acme Inc." value={profile.companyName} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gstNumber">GST Number</Label>
                            <Input id="gstNumber" placeholder="22AAAAA0000A1Z5" value={profile.gstNumber} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="123 Main St, Anytown, USA" value={profile.address} onChange={handleInputChange} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input id="contactNumber" type="tel" placeholder="+1 (555) 123-4567" value={profile.contactNumber} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="supportNumber">Customer Support Number</Label>
                            <Input id="supportNumber" type="tel" placeholder="+1 (800) 555-0199" value={profile.supportNumber} onChange={handleInputChange} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : 'border-border'}`}>
                            <input {...getInputProps()} />
                             <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                            {logoPreview ? (
                                <div className="mt-4">
                                    <Image src={logoPreview} alt="Logo preview" width={100} height={100} className="mx-auto rounded-lg object-contain" />
                                    <p className="mt-2 text-sm text-muted-foreground">Click or drag to replace</p>
                                </div>
                            ) : (
                                <p className="mt-2 text-sm text-muted-foreground">Drag 'n' drop a logo here, or click to select a file</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Invoice Customization</CardTitle>
                    <CardDescription>Set a default tax rate for your invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 max-w-xs">
                        <Label htmlFor="defaultTax">Default Tax Rate (%)</Label>
                        <Input id="defaultTax" type="number" placeholder="e.g., 18" step="0.01" value={profile.defaultTax || 0} onChange={handleTaxChange} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
