
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useFilter } from "@/context/filter-context";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type Dish = {
  name: string;
  searchTerm: string;
  imageId: string;
};

const dishes: Dish[] = [
  { name: "Biryani", searchTerm: "Biryani", imageId: "dish-biryani" },
  { name: "Masala Dosa", searchTerm: "Dosa", imageId: "dish-dosa" },
  {
    name: "Paneer Butter Masala",
    searchTerm: "Paneer",
    imageId: "dish-paneer",
  },
  { name: "Idli Vada", searchTerm: "Idli", imageId: "dish-idli" },
  { name: "Chole Bhature", searchTerm: "Chole", imageId: "dish-chole" },
  { name: "Kebabs", searchTerm: "Kebab", imageId: "dish-kebab" },
];

type PopularDishesProps = {
  cityName: string;
};

export function PopularDishes({ cityName }: PopularDishesProps) {
  const { setSearchTerm } = useFilter();

  const handleDishClick = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const restaurantsSection = document.getElementById("restaurants");
    if (restaurantsSection) {
      restaurantsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
        {`Order Popular Dishes Online in ${cityName}`}
      </h2>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {dishes.map((dish, index) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === dish.imageId
            );
            return (
              <CarouselItem
                key={index}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <button
                  onClick={() => handleDishClick(dish.searchTerm)}
                  className="group block h-full w-full rounded-lg"
                  aria-label={`Filter by ${dish.name}`}
                >
                  <Card className="overflow-hidden transition-all group-hover:shadow-md group-focus:ring-2 group-focus:ring-primary">
                    {image && (
                      <div className="relative h-32 w-full">
                        <Image
                          src={image.imageUrl}
                          alt={dish.name}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}
                    <CardContent className="flex items-center justify-center p-2">
                      <p className="text-sm font-semibold">{dish.name}</p>
                    </CardContent>
                  </Card>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-12 hidden sm:flex" />
        <CarouselNext className="mr-12 hidden sm:flex" />
      </Carousel>
    </section>
  );
}
