"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { WifiOff, Car, LoaderCircle } from "lucide-react";
import { useBookingSimulation, generatePastTrips } from "@/hooks/use-booking-simulation";
import type { BookingRequest, Trip } from "@/lib/types";
import BookingAlert from "./booking-alert";
import MapView from "./map-view";
import DriverStats from "./driver-stats";
import TripInfo from "./trip-info";

export default function DriverDashboard() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [acceptedTrip, setAcceptedTrip] = useState<BookingRequest | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // As a fallback, use a default location if geolocation fails
          if (!currentLocation) {
            setCurrentLocation({ lat: 12.9299, lng: 77.5815 }); // Jayanagar, Bengaluru
          }
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
        // Fallback for browsers without geolocation support
        if (!currentLocation) {
            setCurrentLocation({ lat: 12.9299, lng: 77.5815 }); // Jayanagar, Bengaluru
        }
    }
  }, [currentLocation]);

  const { bookingRequest, clearBooking } = useBookingSimulation(isAvailable, !!acceptedTrip, currentLocation);
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  
  useEffect(() => {
    setTripHistory(generatePastTrips());
  }, []);

  const handleAccept = () => {
    if (bookingRequest) {
      setAcceptedTrip(bookingRequest);
      clearBooking();
    }
  };

  const handleDecline = () => {
    if (bookingRequest) {
      const rejectedTrip: Trip = {
        ...bookingRequest,
        status: 'rejected',
        finalFare: 0,
        tip: 0,
        timestamp: new Date().toISOString(),
      };
      setTripHistory(prev => [rejectedTrip, ...prev]);
      clearBooking();
    }
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    if (!checked) {
      clearBooking();
      setAcceptedTrip(null);
    }
  };

  const handleEndTrip = () => {
    if (acceptedTrip) {
      const completedTrip: Trip = {
        ...acceptedTrip,
        status: 'completed',
        // In a real app, fare would be calculated
        finalFare: acceptedTrip.fareEstimate,
        // Tip would be added by the user
        tip: Math.floor(Math.random() * (acceptedTrip.fareEstimate * 0.25)),
        timestamp: new Date().toISOString(),
      };
      setTripHistory(prev => [completedTrip, ...prev]);
      setAcceptedTrip(null);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">RadCaptian</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="availability-toggle" className={isAvailable ? "text-primary font-semibold" : ""}>
            {isAvailable ? "Online" : "Offline"}
          </Label>
          <Switch
            id="availability-toggle"
            checked={isAvailable}
            onCheckedChange={handleAvailabilityChange}
            disabled={!!acceptedTrip}
          />
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 p-4 md:p-6 lg:p-8 overflow-hidden">
        {bookingRequest && (
          <BookingAlert
            bookingRequest={bookingRequest}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}
        
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
            {acceptedTrip ? (
                <MapView trip={acceptedTrip} onEndTrip={handleEndTrip} driverLocation={currentLocation} />
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
        </div>
        <div className="lg:col-span-2 h-full overflow-y-auto">
             {acceptedTrip ? (
                <TripInfo trip={acceptedTrip} onEndTrip={handleEndTrip} />
             ) : (
                <DriverStats tripHistory={tripHistory} />
             )}
        </div>
      </main>
    </div>
  );
}
