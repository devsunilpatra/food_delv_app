
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type FoodCultureProps = {
  cityName: string;
};

export function FoodCulture({ cityName }: FoodCultureProps) {
  const image = PlaceHolderImages.find((img) => img.id === "food-culture");

  // In a real app, this content would be dynamic based on the city.
  const foodCultureContent = {
    title: `The Vibrant Food Culture of ${cityName}`,
    description: `Explore the rich and diverse culinary landscape of ${cityName}. From bustling street food stalls to fine dining experiences, the city offers a symphony of flavors that reflects its multicultural heritage. Whether you're craving traditional delicacies or modern fusion cuisine, ${cityName}'s food scene has something to tantalize every palate. Don't miss out on the local specialties that make this city a true foodie paradise!`,
  };

  if (cityName.toLowerCase() === "bangalore") {
    foodCultureContent.description = `Bangalore, the Silicon Valley of India, is a melting pot of cultures, and its food scene is a vibrant reflection of this diversity. From the iconic Masala Dosa at Vidyarthi Bhavan to the crispy Vadas at Brahmin's Coffee Bar, the city is a haven for South Indian food lovers. But it doesn't stop there. You'll find everything from trendy cafes and craft breweries in Indiranagar to authentic North Indian thalis in Koramangala. The city's love for innovation is also visible in its food, with many new-age restaurants offering creative fusion dishes. A trip to Bangalore is incomplete without exploring its legendary street food culture in areas like VV Puram Food Street.`;
  }

  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
        Food Culture
      </h2>
      <Card className="overflow-hidden lg:grid lg:grid-cols-2">
        {image && (
          <div className="relative h-64 w-full lg:h-full">
            <Image
              src={image.imageUrl}
              alt={`Food culture in ${cityName}`}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col justify-center">
          <CardHeader>
            <CardTitle>{foodCultureContent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {foodCultureContent.description}
            </p>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
