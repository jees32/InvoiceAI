'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export interface CompanyProfile {
    id?: string;
    companyName?: string;
    gstNumber?: string;
    address?: string;
    contactNumber?: string;
    supportNumber?: string;
    logoUrl?: string;
    defaultTax?: number;
    created_at?: string;
    updated_at?: string;
}

const PROFILE_TABLE = 'profiles';

export async function getProfile(): Promise<CompanyProfile | null> {
    try {
        const { data, error } = await supabase
            .from(PROFILE_TABLE)
            .select('*')
            .limit(1)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No rows returned, which is fine for a new profile
                return null;
            }
            console.error("Failed to fetch profile from Supabase:", error);
            return null;
        }

        // Map snake_case database columns to camelCase for frontend
        return {
            id: data.id,
            companyName: data.company_name,
            gstNumber: data.gst_number,
            address: data.address,
            contactNumber: data.contact_number,
            supportNumber: data.support_number,
            logoUrl: data.logo_url,
            defaultTax: data.default_tax,
            created_at: data.created_at,
            updated_at: data.updated_at
        };
    } catch (error) {
        console.error("Failed to fetch profile from Supabase:", error);
        return null;
    }
}

export async function updateProfile(data: CompanyProfile): Promise<{ success: boolean; message: string }> {
    try {
        // First, check if a profile already exists
        const { data: existingProfile } = await supabase
            .from(PROFILE_TABLE)
            .select('id')
            .limit(1)
            .single();

        let result;
        
        if (existingProfile) {
            // Update existing profile
            const { error } = await supabase
                .from(PROFILE_TABLE)
                .update({
                    company_name: data.companyName,
                    gst_number: data.gstNumber,
                    address: data.address,
                    contact_number: data.contactNumber,
                    support_number: data.supportNumber,
                    logo_url: data.logoUrl,
                    default_tax: data.defaultTax,
                    updated_at: new Date().toISOString()
                })
                .eq('id', existingProfile.id);

            if (error) {
                console.error("Failed to update profile:", error);
                return { success: false, message: error.message || "Failed to update profile." };
            }
        } else {
            // Create new profile
            const { error } = await supabase
                .from(PROFILE_TABLE)
                .insert({
                    company_name: data.companyName,
                    gst_number: data.gstNumber,
                    address: data.address,
                    contact_number: data.contactNumber,
                    support_number: data.supportNumber,
                    logo_url: data.logoUrl,
                    default_tax: data.defaultTax,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });

            if (error) {
                console.error("Failed to create profile:", error);
                return { success: false, message: error.message || "Failed to create profile." };
            }
        }

        revalidatePath('/dashboard/profile');
        return { success: true, message: "Profile updated successfully." };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { success: false, message: "An unexpected error occurred while saving the profile." };
    }
}
