'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

export interface CompanyProfile {
    id?: string;
    companyName?: string;
    gstNumber?: string;
    address?: string;
    contactNumber?: string;
    supportNumber?: string;
    logoUrl?: string;
    defaultTax?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export async function getProfile(): Promise<CompanyProfile | null> {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('User not authenticated');
        }

        const profile = await prisma.profile.findFirst({
            where: { userId }
        });

        if (!profile) {
            return null;
        }

        return {
            id: profile.id,
            companyName: profile.companyName,
            gstNumber: profile.gstNumber,
            address: profile.address,
            contactNumber: profile.contactNumber,
            supportNumber: profile.supportNumber,
            logoUrl: profile.logoUrl,
            defaultTax: profile.defaultTax ? Number(profile.defaultTax) : 0,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt
        };
    } catch (error) {
        console.error("Failed to fetch profile from Prisma:", error);
        return null;
    }
}

export async function updateProfile(data: CompanyProfile): Promise<{ success: boolean; message: string }> {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('User not authenticated');
        }

        // Ensure user exists in database
        await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: { id: userId, email: '' } // Email will be updated by webhook
        });

        // Check if profile exists
        const existingProfile = await prisma.profile.findFirst({
            where: { userId }
        });

        if (existingProfile) {
            // Update existing profile
            await prisma.profile.update({
                where: { id: existingProfile.id },
                data: {
                    companyName: data.companyName,
                    gstNumber: data.gstNumber,
                    address: data.address,
                    contactNumber: data.contactNumber,
                    supportNumber: data.supportNumber,
                    logoUrl: data.logoUrl,
                    defaultTax: data.defaultTax,
                }
            });
        } else {
            // Create new profile
            await prisma.profile.create({
                data: {
                    companyName: data.companyName,
                    gstNumber: data.gstNumber,
                    address: data.address,
                    contactNumber: data.contactNumber,
                    supportNumber: data.supportNumber,
                    logoUrl: data.logoUrl,
                    defaultTax: data.defaultTax,
                    userId
                }
            });
        }

        revalidatePath('/dashboard/profile');
        return { success: true, message: "Profile updated successfully." };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { success: false, message: "An unexpected error occurred while saving the profile." };
    }
}