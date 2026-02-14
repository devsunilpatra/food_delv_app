
"use client";

import { useState, useMemo } from "react";
import type { Restaurant } from "@/lib/types";
import { RestaurantCard } from "./restaurant-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SortOption = "deliveryTime" | "rating" | "costLowToHigh" | "costHighToLow";

type CityRestaurantListingProps = {
  restaurants: Restaurant[];
};

export function CityRestaurantListing({
  restaurants,
}: CityRestaurantListingProps) {
  const [sortOption, setSortOption] = useState<SortOption>("deliveryTime");

  const sortedRestaurants = useMemo(() => {
    return [...restaurants].sort((a, b) => {
      switch (sortOption) {
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime":
          // Assuming deliveryTime is a string like "20-30 min"
          const aTime = parseInt(a.deliveryTime);
          const bTime = parseInt(b.deliveryTime);
          return aTime - bTime;
        case "costLowToHigh":
          return parseInt(a.priceRange) - parseInt(b.priceRange);
        case "costHighToLow":
          return parseInt(b.priceRange) - parseInt(a.priceRange);
        default:
          return 0;
      }
    });
  }, [restaurants, sortOption]);

  return (
    <section id="restaurants" className="container mx-auto px-4">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-left md:text-4xl">
          Order Online
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Sort by:</span>
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deliveryTime">Delivery Time</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="costLowToHigh">Cost: Low to High</SelectItem>
              <SelectItem value="costHighToLow">Cost: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}
