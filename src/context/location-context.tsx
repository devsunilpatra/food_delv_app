"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Location = {
  name: string;
  latitude: number;
  longitude: number;
};

export const locations: Location[] = [
    { name: "Downtown LA", latitude: 34.0522, longitude: -118.2437 },
    { name: "Santa Monica", latitude: 34.0195, longitude: -118.4912 },
    { name: "Hollywood", latitude: 34.0928, longitude: -118.3287 },
    { name: "Beverly Hills", latitude: 34.0736, longitude: -118.4004 },
];

type LocationContextType = {
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
  locations: Location[];
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location>(locations[0]);

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation, locations }}>
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
