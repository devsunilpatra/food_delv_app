"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pizza,
  Beef,
  Fish,
  CookingPot,
  Salad,
  Bean,
  CakeSlice,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import { useFilter } from "@/context/filter-context";

type Category = {
  name: string;
  icon: LucideIcon;
  searchTerm: string;
};

const categories: Category[] = [
  { name: "Pizza", icon: Pizza, searchTerm: "Pizza" },
  { name: "Burgers", icon: Beef, searchTerm: "Burger" },
  { name: "Sushi", icon: Fish, searchTerm: "Sushi" },
  { name: "Indian", icon: CookingPot, searchTerm: "Indian" },
  { name: "Salads", icon: Salad, searchTerm: "Salad" },
  { name: "Mexican", icon: Bean, searchTerm: "Mexican" },
  { name: "Desserts", icon: CakeSlice, searchTerm: "Dessert" },
  { name: "Coffee", icon: Coffee, searchTerm: "Coffee" },
];

export function CategoryCarousel() {
  const { setSearchTerm } = useFilter();

  const handleCategoryClick = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const restaurantsSection = document.getElementById("restaurants");
    if (restaurantsSection) {
      restaurantsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
        Top Categories
      </h2>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 pl-4 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <button
                onClick={() => handleCategoryClick(category.searchTerm)}
                className="group block h-full w-full rounded-lg"
                aria-label={`Filter by ${category.name}`}
              >
                <Card className="flex h-32 flex-col items-center justify-center p-4 transition-all group-hover:bg-secondary group-hover:shadow-md group-focus:ring-2 group-focus:ring-primary">
                  <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                    <category.icon className="h-8 w-8 text-primary" />
                    <p className="text-sm font-semibold">{category.name}</p>
                  </CardContent>
                </Card>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 hidden sm:flex" />
        <CarouselNext className="mr-12 hidden sm:flex" />
      </Carousel>
    </section>
  );
}
