"use client";

import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { LocationProvider } from "@/context/location-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <LocationProvider>{children}</LocationProvider>
      </CartProvider>
    </AuthProvider>
  );
}
