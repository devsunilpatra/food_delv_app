"use client";

import Link from "next/link";

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
];

export function CitiesSection() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
        Find Us In These Cities
      </h2>
      <div className="columns-2 gap-x-8 text-center sm:columns-3 md:columns-4 lg:columns-5">
        {CITIES.map((city) => (
          <Link
            key={city}
            href="#"
            className="mb-2 block rounded-md p-1 text-muted-foreground hover:bg-accent/50 hover:text-primary"
          >
            {city}
          </Link>
        ))}
      </div>
    </section>
  );
}
