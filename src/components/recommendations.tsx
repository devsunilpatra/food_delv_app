"use client";

import { useState } from "react";
import { getRecommendations } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";
import type { ReceivePersonalizedRestaurantRecommendationsOutput } from "@/ai/flows/receive-personalized-restaurant-recommendations";
import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const mockPastOrders = [
  {
    restaurantName: "Pizza Palace",
    itemsOrdered: ["Pepperoni Pizza", "Garlic Bread"],
    cuisine: "Italian",
    totalPrice: 25.99,
  },
  {
    restaurantName: "Burger Barn",
    itemsOrdered: ["Cheeseburger", "Fries"],
    cuisine: "American",
    totalPrice: 15.5,
  },
];

const mockUserPreferences = ["spicy", "vegetarian options"];

export function Recommendations() {
  const { isLoggedIn } = useAuth();
  const [recommendations, setRecommendations] =
    useState<ReceivePersonalizedRestaurantRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getRecommendations({
        pastOrderHistory: mockPastOrders,
        userPreferences: mockUserPreferences,
      });
      setRecommendations(result);
    } catch (e) {
      setError("Sorry, we couldn't fetch recommendations at this time.");
      console.error(e);
    }
    setIsLoading(false);
  };

  if (!isLoggedIn) {
    return null; // Don't show recommendations if user is not logged in
  }

  return (
    <section>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Just For You
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Discover new favorites with AI-powered recommendations based on your
          tastes.
        </p>
      </div>

      <div className="mt-8">
        {!recommendations && !isLoading && !error && (
          <div className="flex justify-center">
            <Button size="lg" onClick={handleGetRecommendations}>
              <Sparkles className="mr-2 h-5 w-5" />
              Get My Recommendations
            </Button>
          </div>
        )}

        {isLoading && (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <Skeleton className="h-48 w-full" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="mt-2 h-4 w-1/2" />
                        <Skeleton className="mt-4 h-16 w-full" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {error && <p className="text-center text-destructive">{error}</p>}

        {recommendations && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {recommendations.recommendations.map((rec, index) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === `recommendation-${(index % 3) + 1}`
                );
                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="flex h-full flex-col">
                        <CardHeader className="p-0">
                          {image && (
                            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                              <Image
                                src={image.imageUrl}
                                alt={rec.restaurantName}
                                data-ai-hint={image.imageHint}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="flex-grow p-4">
                          <h3 className="text-lg font-bold">
                            {rec.restaurantName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {rec.cuisine}
                          </p>
                          <div className="my-2 flex items-center gap-2 text-sm">
                            {rec.averageRating && (
                              <div className="flex items-center gap-1">
                                <Star
                                  className="h-4 w-4 text-yellow-400"
                                  fill="currentColor"
                                />
                                <span className="font-semibold">
                                  {rec.averageRating}
                                </span>
                              </div>
                            )}
                            {rec.deliveryTimeEstimate && (
                              <span>• {rec.deliveryTimeEstimate}</span>
                            )}
                          </div>
                          <CardDescription>{rec.reason}</CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        )}
      </div>
    </section>
  );
}
