import { RestaurantGrid } from "@/components/restaurant-grid";
import { restaurants } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Recommendations } from "@/components/recommendations";
import { CategoryCarousel } from "@/components/category-carousel";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
      <section className="relative h-[60vh] max-h-[600px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center text-primary-foreground">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl drop-shadow-lg">
              Craving something delicious?
            </h1>
            <p className="max-w-2xl text-lg md:text-xl drop-shadow-md">
              Get your favorite meals from local restaurants delivered to your
              door, fast.
            </p>
            <Button asChild size="lg" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#restaurants">Order Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <CategoryCarousel />

      <div className="container mx-auto px-4">
        <Recommendations />
      </div>

      <section id="restaurants" className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured Restaurants
        </h2>
        <RestaurantGrid restaurants={restaurants} />
      </section>
    </div>
  );
}
