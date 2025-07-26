'use server';

import prisma from '@/lib/prisma';
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

export async function getProducts(userId: string): Promise<Product[]> {
    if (!userId) return [];
    try {
        return await prisma.product.findMany({ where: { userId } });
    } catch (error) {
        console.error('Failed to fetch products from Prisma:', error);
        return [];
    }
}

export async function addProduct(data: ProductData & { userId: string }): Promise<Product> {
    try {
        if (!data.userId) {
            throw new Error('User not authenticated');
        }
        const product = await prisma.product.create({
            data: {
                name: data.name,
                sku: data.sku,
                price: data.price,
                inventory: data.inventory,
                tax: data.tax,
                userId: data.userId
            }
        });
        revalidatePath('/dashboard/products');
        return {
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: Number(product.price),
            inventory: product.inventory,
            tax: Number(product.tax)
        };
    } catch (error) {
        console.error("Failed to add product:", error);
        throw new Error("Failed to add product.");
    }
}

export async function updateProduct(data: Product & { userId: string }): Promise<Product> {
    try {
        if (!data.userId) {
            throw new Error('User not authenticated');
        }
        const product = await prisma.product.update({
            where: { 
                id: data.id,
                OR: [
                    { userId: data.userId },
                    { userId: null }
                ]
            },
            data: {
                name: data.name,
                sku: data.sku,
                price: data.price,
                inventory: data.inventory,
                tax: data.tax
            }
        });
        revalidatePath('/dashboard/products');
        return {
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: Number(product.price),
            inventory: product.inventory,
            tax: Number(product.tax)
        };
    } catch (error) {
        console.error("Failed to update product:", error);
        throw new Error("Failed to update product.");
    }
}

export async function deleteProduct(id: string, userId: string): Promise<{ success: true, id: string }> {
    try {
        if (!userId) {
            throw new Error('User not authenticated');
        }
        await prisma.product.delete({
            where: { 
                id,
                OR: [
                    { userId: userId },
                    { userId: null }
                ]
            }
        });
        revalidatePath('/dashboard/products');
        return { success: true, id };
    } catch (error) {
        console.error("Failed to delete product:", error);
        throw new Error("Failed to delete product.");
    }
}