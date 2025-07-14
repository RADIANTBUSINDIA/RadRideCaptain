"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, Car, LoaderCircle, Route } from "lucide-react";
import { useBookingSimulation } from "@/hooks/use-booking-simulation";
import type { BookingRequest } from "@/lib/types";
import BookingAlert from "./booking-alert";
import MapView from "./map-view";
import RouteOptimizer from "./route-optimizer";

export default function DriverDashboard() {
  const [isAvailable, setIsAvailable] = useState(false);
  const { bookingRequest, clearBooking } = useBookingSimulation(isAvailable);
  const [acceptedTrip, setAcceptedTrip] = useState<BookingRequest | null>(null);

  const handleAccept = () => {
    if (bookingRequest) {
      setAcceptedTrip(bookingRequest);
      clearBooking();
    }
  };

  const handleDecline = () => {
    clearBooking();
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    if (!checked) {
      clearBooking();
      setAcceptedTrip(null);
    }
  };

  const handleEndTrip = () => {
    setAcceptedTrip(null);
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">DriverSidekick</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="availability-toggle" className={isAvailable ? "text-primary font-semibold" : ""}>
            {isAvailable ? "Online" : "Offline"}
          </Label>
          <Switch
            id="availability-toggle"
            checked={isAvailable}
            onCheckedChange={handleAvailabilityChange}
          />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {bookingRequest && (
          <BookingAlert
            bookingRequest={bookingRequest}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}
        
        {acceptedTrip ? (
          <div className="grid gap-6 lg:grid-cols-5 h-full">
            <div className="lg:col-span-3 h-full">
              <MapView trip={acceptedTrip} />
            </div>
            <div className="lg:col-span-2">
              <RouteOptimizer trip={acceptedTrip} onEndTrip={handleEndTrip}/>
            </div>
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="p-0">
              <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
                {!isAvailable ? (
                  <>
                    <WifiOff className="w-16 h-16" />
                    <h2 className="text-2xl font-semibold">You Are Offline</h2>
                    <p>Toggle the switch to go online and receive requests.</p>
                  </>
                ) : (
                  <>
                    <LoaderCircle className="w-16 h-16 animate-spin text-primary" />
                    <h2 className="text-2xl font-semibold">Searching for Rides...</h2>
                    <p>You'll be notified when a new request comes in.</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
