import { UtensilsCrossed, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <p className="text-lg font-bold">FoodDash</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FoodDash Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            aria-label="Twitter"
            className="text-muted-foreground hover:text-primary"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-primary"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
