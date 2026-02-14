"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const total = getCartTotal();

  const handlePlaceOrder = () => {
    const orderId = `FD${Date.now()}`;
    toast({
      title: "Order Placed!",
      description: `Your order #${orderId} has been successfully placed.`,
    });
    clearCart();
    router.push(`/track/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/">Start Ordering</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[80vh] px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Your Cart</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center overflow-hidden">
              <div className="relative h-28 w-28 flex-shrink-0">
                <Image
                  src={item.image || "https://picsum.photos/seed/item/200"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="flex-grow">
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                  ${item.price.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-bold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(total + 5 + total * 0.1).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
