"use client";

import { useMemo } from "react";
import type { Restaurant } from "@/lib/types";
import { RestaurantCard } from "./restaurant-card";
import { useLocation } from "@/context/location-context";
import { getDistanceFromLatLonInKm } from "@/lib/utils";
import { useFilter } from "@/context/filter-context";

type RestaurantGridProps = {
  restaurants: Restaurant[];
};

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  const { searchTerm } = useFilter();
  const { currentLocation } = useLocation();

  const sortedAndFilteredRestaurants = useMemo(() => {
    const sorted = restaurants
      .map((restaurant) => ({
        ...restaurant,
        distance: getDistanceFromLatLonInKm(
          currentLocation.latitude,
          currentLocation.longitude,
          restaurant.latitude,
          restaurant.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    if (!searchTerm) {
      return sorted;
    }

    return sorted.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [restaurants, currentLocation, searchTerm]);

  return (
    <div className="flex flex-col gap-8">
      {sortedAndFilteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedAndFilteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <p>No restaurants found for &quot;{searchTerm}&quot;.</p>
          <p>Try a different search term or change your location.</p>
        </div>
      )}
    </div>
  );
}
