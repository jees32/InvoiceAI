'use server';

import { supabase } from '@/lib/supabase';
import type { TemplateType } from '@/types/invoice';

export interface Template {
  id: TemplateType;
  name: string;
  color: string;
}

const templatesToSeed: Template[] = [
    { id: 'modern', name: 'Modern', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'elegant', name: 'Elegant', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'professional', name: 'Professional', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'minimal', name: 'Minimal', color: 'bg-gray-500 hover:bg-gray-600' },
    { id: 'vibrant', name: 'Vibrant', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'corporate', name: 'Corporate', color: 'bg-indigo-500 hover:bg-indigo-600' },
];

export async function seedTemplates() {
    try {
        const { error } = await supabase
            .from('templates')
            .upsert(templatesToSeed, { onConflict: 'id' });

        if (error) {
            console.error("Failed to seed templates:", error);
            return { success: false, message: "Could not seed templates due to a server error." };
        }

        return { success: true, message: `${templatesToSeed.length} templates seeded successfully.` };
    } catch (error) {
        console.error("Failed to seed templates:", error);
        return { success: false, message: "Could not seed templates due to a server error." };
    }
}

export async function getTemplates(): Promise<Template[]> {
    try {
        const { data, error } = await supabase
            .from('templates')
            .select('*')
            .order('name');

        if (error) {
            console.error("Failed to fetch templates from Supabase:", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Failed to fetch templates from Supabase:", error);
        return [];
    }
}