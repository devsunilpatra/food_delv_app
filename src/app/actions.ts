
"use server";

import { receivePersonalizedRestaurantRecommendations } from "@/ai/flows/receive-personalized-restaurant-recommendations";
import type { ReceivePersonalizedRestaurantRecommendationsInput } from "@/ai/flows/receive-personalized-restaurant-recommendations";

export async function getRecommendations(
  input: ReceivePersonalizedRestaurantRecommendationsInput
) {
  const recommendations = await receivePersonalizedRestaurantRecommendations(input);
  return recommendations;
}
