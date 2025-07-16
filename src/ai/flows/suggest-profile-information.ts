// src/ai/flows/suggest-profile-information.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest business profile information
 * based on initial user inputs, facilitating a quicker onboarding process.
 *
 * - suggestProfileInformation - The main function to trigger the profile information suggestion flow.
 * - SuggestProfileInformationInput - The input type for the suggestProfileInformation function.
 * - SuggestProfileInformationOutput - The output type for the suggestProfileInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProfileInformationInputSchema = z.object({
  partialProfile: z
    .string()
    .describe(
      'A string containing the partial business profile information provided by the user.'
    ),
});
export type SuggestProfileInformationInput = z.infer<
  typeof SuggestProfileInformationInputSchema
>;

const SuggestProfileInformationOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'An array of suggested business profile information based on the input.'
    ),
});
export type SuggestProfileInformationOutput = z.infer<
  typeof SuggestProfileInformationOutputSchema
>;

export async function suggestProfileInformation(
  input: SuggestProfileInformationInput
): Promise<SuggestProfileInformationOutput> {
  return suggestProfileInformationFlow(input);
}

const suggestProfileInformationPrompt = ai.definePrompt({
  name: 'suggestProfileInformationPrompt',
  input: {schema: SuggestProfileInformationInputSchema},
  output: {schema: SuggestProfileInformationOutputSchema},
  prompt: `You are an AI assistant designed to suggest business profile information to users.

  Based on the following partial business profile information provided by the user, suggest relevant and helpful information to complete their profile.

  Partial Profile Information: {{{partialProfile}}}

  Suggestions should be in a format that the user can easily copy and paste into their profile.
  The suggestions should be diverse, explore many possibilities.
  Suggestions:
  `,
});

const suggestProfileInformationFlow = ai.defineFlow(
  {
    name: 'suggestProfileInformationFlow',
    inputSchema: SuggestProfileInformationInputSchema,
    outputSchema: SuggestProfileInformationOutputSchema,
  },
  async input => {
    const {output} = await suggestProfileInformationPrompt(input);
    return output!;
  }
);

