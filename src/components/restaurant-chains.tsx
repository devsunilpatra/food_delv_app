
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { restaurants } from "@/lib/data";
import { RestaurantCard } from "./restaurant-card";

type RestaurantChainsProps = {
  cityName: string;
};

export function RestaurantChains({ cityName }: RestaurantChainsProps) {
  // For demo purposes, let's just pick a few restaurants to be "chains"
  const chains = restaurants.slice(0, 4);
  const title = `Popular Restaurant Chains in ${cityName}`;

  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {chains.map((restaurant) => (
            <CarouselItem
              key={restaurant.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <RestaurantCard restaurant={restaurant} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 hidden sm:flex" />
        <CarouselNext className="mr-12 hidden sm:flex" />
      </Carousel>
    </section>
  );
}
