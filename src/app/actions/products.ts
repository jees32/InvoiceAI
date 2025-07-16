'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    inventory: number;
    tax: number;
}

export type ProductData = Omit<Product, 'id'>;

const PRODUCTS_TABLE = 'products';

export async function getProducts(): Promise<Product[]> {
    try {
        const { data, error } = await supabase
            .from(PRODUCTS_TABLE)
            .select('*')
            .order('name');

        if (error) {
            console.error("Failed to fetch products from Supabase:", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Failed to fetch products from Supabase:", error);
        return [];
    }
}

export async function addProduct(data: ProductData): Promise<Product> {
    try {
        const { data: product, error } = await supabase
            .from(PRODUCTS_TABLE)
            .insert(data)
            .select()
            .single();

        if (error) {
            console.error("Failed to add product:", error);
            throw new Error("Failed to add product.");
        }

        revalidatePath('/dashboard/products');
        return product;
    } catch (e) {
        console.error("Failed to add product:", e);
        throw new Error("Failed to add product.");
    }
}

export async function updateProduct(data: Product): Promise<Product> {
    try {
        const { id, ...productData } = data;
        const { data: product, error } = await supabase
            .from(PRODUCTS_TABLE)
            .update(productData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Failed to update product:", error);
            throw new Error("Failed to update product.");
        }

        revalidatePath('/dashboard/products');
        return product;
    } catch (e) {
        console.error("Failed to update product:", e);
        throw new Error("Failed to update product.");
    }
}

export async function deleteProduct(id: string): Promise<{ success: true, id: string }> {
    try {
        const { error } = await supabase
            .from(PRODUCTS_TABLE)
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Failed to delete product:", error);
            throw new Error("Failed to delete product.");
        }

        revalidatePath('/dashboard/products');
        return { success: true, id };
    } catch (e) {
        console.error("Failed to delete product:", e);
        throw new Error("Failed to delete product.");
    }
}