
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

type CityBannerProps = {
  cityName: string;
};

export function CityBanner({ cityName }: CityBannerProps) {
  const image = PlaceHolderImages.find((img) => img.id === "city-banner");
  return (
    <section className="relative h-72 w-full">
      {image && (
        <Image
          src={image.imageUrl}
          alt={`A view of ${cityName}`}
          data-ai-hint={image.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center text-primary-foreground">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl drop-shadow-lg">
            {`Best Food in ${cityName}`}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl drop-shadow-md">
            Order from the best restaurants in town.
          </p>
        </div>
      </div>
    </section>
  );
}
