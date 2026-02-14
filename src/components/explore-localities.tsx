
"use client";

import Link from "next/link";

const LOCALITIES = [
  "Koramangala",
  "Indiranagar",
  "HSR Layout",
  "Jayanagar",
  "Whitefield",
  "Marathahalli",
  "BTM Layout",
  "Electronic City",
  "JP Nagar",
  "Bellandur",
];

type ExploreLocalitiesProps = {
  cityName: string;
};

export function ExploreLocalities({ cityName }: ExploreLocalitiesProps) {
  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
        {`Explore localities in and around ${cityName}`}
      </h2>
      <div className="columns-2 gap-x-8 text-center sm:columns-3 md:columns-4 lg:columns-5">
        {LOCALITIES.map((locality) => (
          <Link
            key={locality}
            href="#restaurants" // For now, just scroll to the restaurants section
            className="mb-2 block rounded-md p-1 text-muted-foreground hover:bg-accent/50 hover:text-primary"
          >
            {locality}
          </Link>
        ))}
      </div>
    </section>
  );
}
