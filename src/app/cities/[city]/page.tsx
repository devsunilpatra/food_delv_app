
import { CategoryCarousel } from "@/components/category-carousel";
import { CityBanner } from "@/components/city-banner";
import { CityRestaurantListing } from "@/components/city-restaurant-listing";
import { FoodCulture } from "@/components/food-culture";
import { RestaurantChains } from "@/components/restaurant-chains";
import { restaurants } from "@/lib/data";
import { notFound } from "next/navigation";

// For demo, we can just use a static list of cities. In a real app, this might come from an API.
const CITIES = [
  "Los Angeles",
  "New York",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Boston",
  "Seattle",
  "Denver",
  "Washington DC",
  "Nashville",
  "Las Vegas",
  "Bangalore",
];

type CityPageProps = {
  params: {
    city: string;
  };
};

export default function CityPage({ params }: CityPageProps) {
  const cityName = decodeURIComponent(params.city);

  if (!CITIES.map((c) => c.toLowerCase()).includes(cityName.toLowerCase())) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-12 pb-12 md:gap-16 md:pb-16 lg:gap-24 lg:pb-24">
      <CityBanner cityName={cityName} />
      <CategoryCarousel />
      <RestaurantChains />
      <CityRestaurantListing restaurants={restaurants} />
      <FoodCulture cityName={cityName} />
    </div>
  );
}

// This function can be used to generate static paths if we want to pre-render these pages at build time.
export async function generateStaticParams() {
  return CITIES.map((city) => ({
    city: encodeURIComponent(city),
  }));
}
