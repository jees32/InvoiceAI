// src/ai/flows/suggest-products.ts
'use server';

/**
 * @fileOverview Suggests products from the user's inventory for invoice creation.
 *
 * - suggestProducts - A function that suggests products based on user input.
 * - SuggestProductsInput - The input type for the suggestProducts function.
 * - SuggestProductsOutput - The return type for the suggestProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProductsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  partialProductName: z.string().describe('The partial name of the product being searched for.'),
});
export type SuggestProductsInput = z.infer<typeof SuggestProductsInputSchema>;

const SuggestProductsOutputSchema = z.array(
  z.object({
    productName: z.string().describe('The name of the product.'),
    sku: z.string().describe('The SKU of the product.'),
    price: z.number().describe('The price of the product.'),
    inventory: z.number().describe('The current inventory of the product.'),
    tax: z.number().describe('The tax percentage for the product.'),
  })
);
export type SuggestProductsOutput = z.infer<typeof SuggestProductsOutputSchema>;

export async function suggestProducts(input: SuggestProductsInput): Promise<SuggestProductsOutput> {
  return suggestProductsFlow(input);
}

const getProducts = ai.defineTool({
  name: 'getProducts',
  description: 'Retrieves products from the database based on a partial product name.',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user.'),
    partialProductName: z.string().describe('The partial name of the product to search for.'),
  }),
  outputSchema: z.array(
    z.object({
      productName: z.string().describe('The name of the product.'),
      sku: z.string().describe('The SKU of the product.'),
      price: z.number().describe('The price of the product.'),
      inventory: z.number().describe('The current inventory of the product.'),
      tax: z.number().describe('The tax percentage for the product.'),
    })
  ),
},
async (input) => {
    // TODO: Replace with actual database retrieval logic
    // This is placeholder data
    const products = [
      {
        productName: `Product A - ${input.partialProductName}`,
        sku: 'SKU001',
        price: 25,
        inventory: 100,
        tax: 0.08,
      },
      {
        productName: `Product B - ${input.partialProductName}`,
        sku: 'SKU002',
        price: 50,
        inventory: 50,
        tax: 0.08,
      },
    ];
    return products;
  }
);

const suggestProductsFlow = ai.defineFlow({
    name: 'suggestProductsFlow',
    inputSchema: SuggestProductsInputSchema,
    outputSchema: SuggestProductsOutputSchema,
  },
  async input => {
    const products = await getProducts(input);
    return products;
  }
);
