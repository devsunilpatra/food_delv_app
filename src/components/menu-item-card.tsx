"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type MenuItemCardProps = {
  item: MenuItem;
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const image = PlaceHolderImages.find((img) => img.id === item.imageId);

  const handleAddToCart = () => {
    addToCart({ ...item, image: image?.imageUrl, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image.imageUrl}
            alt={item.name}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription className="flex-grow">{item.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between">
        <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart}>
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
