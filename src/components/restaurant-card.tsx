import type { Restaurant } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

type RestaurantCardProps = {
  restaurant: Restaurant;
  className?: string;
};

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === restaurant.imageId);

  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group block">
      <Card
        className={cn(
          "h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1",
          className
        )}
      >
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={restaurant.name}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-1 truncate text-lg">
            {restaurant.name}
          </CardTitle>
          <CardDescription className="truncate">{restaurant.cuisine}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="font-semibold text-foreground">
              {restaurant.rating}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <Badge variant="secondary" className="font-normal">
            ${restaurant.priceRange}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
