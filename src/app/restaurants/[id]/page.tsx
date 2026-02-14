import { restaurants } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star, Clock, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MenuItemCard } from "@/components/menu-item-card";

type RestaurantPageProps = {
  params: {
    id: string;
  };
};

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = restaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === restaurant.imageId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg shadow-lg">
        {image && (
          <Image
            src={image.imageUrl}
            alt={restaurant.name}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            {restaurant.name}
          </h1>
          <p className="text-lg text-gray-200 drop-shadow">
            {restaurant.address}
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
          <span className="font-bold text-foreground">{restaurant.rating}</span>
          <span>({restaurant.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>{restaurant.deliveryTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          <span>{restaurant.cuisine}</span>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">Menu</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurant.menu.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
