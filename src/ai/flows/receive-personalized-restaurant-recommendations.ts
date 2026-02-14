'use server';
/**
 * @fileOverview A Genkit flow for providing personalized restaurant recommendations.
 *
 * - receivePersonalizedRestaurantRecommendations - A function that handles generating restaurant recommendations.
 * - ReceivePersonalizedRestaurantRecommendationsInput - The input type for the recommendation function.
 * - ReceivePersonalizedRestaurantRecommendationsOutput - The return type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReceivePersonalizedRestaurantRecommendationsInputSchema = z.object({
  userPreferences: z.array(z.string()).describe('A list of the user\'s food preferences, e.g., "vegetarian", "spicy", "italian cuisine".'),
  pastOrderHistory: z.array(z.object({
    restaurantName: z.string().describe('The name of the restaurant from a past order.'),
    itemsOrdered: z.array(z.string()).describe('A list of items ordered from this restaurant.'),
    cuisine: z.string().describe('The cuisine type of the restaurant.'),
    totalPrice: z.number().describe('The total price of the order.'),
  })).describe('A list of the user\'s past food orders, including restaurant details and items ordered.'),
});
export type ReceivePersonalizedRestaurantRecommendationsInput = z.infer<typeof ReceivePersonalizedRestaurantRecommendationsInputSchema>;

const ReceivePersonalizedRestaurantRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.object({
    restaurantName: z.string().describe('The name of the recommended restaurant.'),
    cuisine: z.string().describe('The cuisine type of the recommended restaurant.'),
    reason: z.string().describe('A brief explanation of why this restaurant is recommended based on user preferences and past orders.'),
    averageRating: z.number().optional().describe('The average rating of the restaurant, if available.'),
    deliveryTimeEstimate: z.string().optional().describe('An estimated delivery time for the restaurant, e.g., "30-45 minutes".'),
  })).describe('A list of personalized restaurant recommendations.'),
});
export type ReceivePersonalizedRestaurantRecommendationsOutput = z.infer<typeof ReceivePersonalizedRestaurantRecommendationsOutputSchema>;

export async function receivePersonalizedRestaurantRecommendations(input: ReceivePersonalizedRestaurantRecommendationsInput): Promise<ReceivePersonalizedRestaurantRecommendationsOutput> {
  return receivePersonalizedRestaurantRecommendationsFlow(input);
}

const recommendationPrompt = ai.definePrompt({
  name: 'personalizedRestaurantRecommendationPrompt',
  input: { schema: ReceivePersonalizedRestaurantRecommendationsInputSchema },
  output: { schema: ReceivePersonalizedRestaurantRecommendationsOutputSchema },
  prompt: `You are an AI assistant specialized in recommending restaurants. Your task is to provide personalized restaurant recommendations to a user based on their stated preferences and past order history.

Consider the user's preferences carefully and analyze their past orders to understand their tastes. Aim to recommend restaurants that align with their preferences and complement their previous choices. Provide a brief but compelling reason for each recommendation.

User Preferences:
{{#if userPreferences}}
  {{#each userPreferences}}- {{this}}
  {{/each}}
{{else}}
  No specific preferences provided.
{{/if}}

Past Order History:
{{#if pastOrderHistory}}
  {{#each pastOrderHistory}}
  - Restaurant: {{{restaurantName}}} (Cuisine: {{{cuisine}}})
    Items ordered: {{#each itemsOrdered}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    Total Price: \${{{totalPrice}}}
  {{/each}}
{{else}}
  No past order history available.
{{/if}}

Based on this information, provide 3-5 personalized restaurant recommendations.
`,
});

const receivePersonalizedRestaurantRecommendationsFlow = ai.defineFlow(
  {
    name: 'receivePersonalizedRestaurantRecommendationsFlow',
    inputSchema: ReceivePersonalizedRestaurantRecommendationsInputSchema,
    outputSchema: ReceivePersonalizedRestaurantRecommendationsOutputSchema,
  },
  async (input) => {
    const {output} = await recommendationPrompt(input);
    return output!;
  }
);
