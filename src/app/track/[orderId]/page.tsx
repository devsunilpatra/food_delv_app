import { OrderStatus } from "@/components/order-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Utensils } from "lucide-react";

type TrackOrderPageProps = {
  params: {
    orderId: string;
  };
};

export default function TrackOrderPage({ params }: TrackOrderPageProps) {
  return (
    <div className="container mx-auto min-h-[80vh] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Track Your Order
            </CardTitle>
            <CardDescription className="text-lg">
              Order ID: #{params.orderId}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 flex flex-col gap-8">
            <OrderStatus />
            <div className="grid grid-cols-1 gap-4 rounded-lg border bg-secondary p-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Utensils className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">From</p>
                  <p className="text-sm text-muted-foreground">Pizza Palace</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">To</p>
                  <p className="text-sm text-muted-foreground">
                    123 Main St, Anytown, USA
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
