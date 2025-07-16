'use server';

/**
 * @fileOverview Summarizes key invoice data for a business owner.
 *
 * - summarizeInvoiceData - A function that summarizes invoice data.
 * - SummarizeInvoiceDataInput - The input type for the summarizeInvoiceData function.
 * - SummarizeInvoiceDataOutput - The return type for the summarizeInvoiceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeInvoiceDataInputSchema = z.object({
  invoiceData: z.string().describe('A string containing invoice data in JSON format.'),
});
export type SummarizeInvoiceDataInput = z.infer<typeof SummarizeInvoiceDataInputSchema>;

const SummarizeInvoiceDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the key invoice data, including total revenue, average invoice amount, and outstanding payments.'),
});
export type SummarizeInvoiceDataOutput = z.infer<typeof SummarizeInvoiceDataOutputSchema>;

export async function summarizeInvoiceData(input: SummarizeInvoiceDataInput): Promise<SummarizeInvoiceDataOutput> {
  return summarizeInvoiceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeInvoiceDataPrompt',
  input: {schema: SummarizeInvoiceDataInputSchema},
  output: {schema: SummarizeInvoiceDataOutputSchema},
  prompt: `You are an AI assistant helping business owners understand their finances.  You will be provided with invoice data in JSON format.  Your task is to summarize the key information, including total revenue, average invoice amount, and outstanding payments.  Provide a concise and easy-to-understand summary.

Invoice Data: {{{invoiceData}}}`,
});

const summarizeInvoiceDataFlow = ai.defineFlow(
  {
    name: 'summarizeInvoiceDataFlow',
    inputSchema: SummarizeInvoiceDataInputSchema,
    outputSchema: SummarizeInvoiceDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
