"use client";

import { useState } from "react";
import type { Restaurant } from "@/lib/types";
import { Input } from "./ui/input";
import { RestaurantCard } from "./restaurant-card";
import { Search } from "lucide-react";

type RestaurantGridProps = {
  restaurants: Restaurant[];
};

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="relative mx-auto w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for your favorite restaurant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-full bg-muted py-6 pl-12 text-base"
        />
      </div>

      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <p>No restaurants found for &quot;{searchTerm}&quot;.</p>
          <p>Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
