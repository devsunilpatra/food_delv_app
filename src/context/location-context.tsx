"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Location = {
  name: string;
  latitude: number;
  longitude: number;
};

export const locations: Location[] = [
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
  { name: "Houston", latitude: 29.7604, longitude: -95.3698 },
  { name: "Phoenix", latitude: 33.4484, longitude: -112.074 },
  { name: "Philadelphia", latitude: 39.9526, longitude: -75.1652 },
  { name: "San Antonio", latitude: 29.4241, longitude: -98.4936 },
  { name: "San Diego", latitude: 32.7157, longitude: -117.1611 },
  { name: "Dallas", latitude: 32.7767, longitude: -96.797 },
  { name: "San Jose", latitude: 37.3382, longitude: -121.8863 },
  { name: "Austin", latitude: 30.2672, longitude: -97.7431 },
  { name: "Jacksonville", latitude: 30.3322, longitude: -81.6557 },
  { name: "Fort Worth", latitude: 32.7555, longitude: -97.3308 },
  { name: "Columbus", latitude: 39.9612, longitude: -82.9988 },
  { name: "Boston", latitude: 42.3601, longitude: -71.0589 },
  { name: "Seattle", latitude: 47.6062, longitude: -122.3321 },
  { name: "Denver", latitude: 39.7392, longitude: -104.9903 },
  { name: "Washington DC", latitude: 38.9072, longitude: -77.0369 },
  { name: "Nashville", latitude: 36.1627, longitude: -86.7816 },
  { name: "Las Vegas", latitude: 36.1699, longitude: -115.1398 },
  { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
];

type LocationContextType = {
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
  locations: Location[];
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location>(
    locations[0]
  );

  return (
    <LocationContext.Provider
      value={{ currentLocation, setCurrentLocation, locations }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
