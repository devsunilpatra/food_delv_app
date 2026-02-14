"use client";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { CheckCircle2, CookingPot, Bike, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = [
  { name: "Order Placed", icon: CheckCircle2, duration: 2000 },
  { name: "Preparing Food", icon: CookingPot, duration: 5000 },
  { name: "Out for Delivery", icon: Bike, duration: 8000 },
  { name: "Delivered", icon: Home, duration: 0 },
];

export function OrderStatus() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    if (currentStatusIndex >= statuses.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStatusIndex((prevIndex) => prevIndex + 1);
    }, statuses[currentStatusIndex].duration);

    return () => clearTimeout(timer);
  }, [currentStatusIndex]);

  const progressValue = ((currentStatusIndex + 1) / statuses.length) * 100;

  return (
    <div className="flex flex-col gap-6">
      <Progress value={progressValue} className="h-2" />
      <div className="grid grid-cols-4 gap-2 text-center">
        {statuses.map((status, index) => {
          const isActive = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          return (
            <div key={status.name} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-300",
                  isActive && "bg-primary text-primary-foreground",
                  isCurrent && "animate-pulse"
                )}
              >
                <status.icon className="h-6 w-6" />
              </div>
              <p
                className={cn(
                  "text-xs font-medium text-muted-foreground sm:text-sm",
                  isActive && "text-foreground"
                )}
              >
                {status.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
