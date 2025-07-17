
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { WifiOff, LoaderCircle, Car, LogOut } from "lucide-react";
import { useBookingSimulation } from "@/hooks/use-booking-simulation";
import type { BookingRequest, Trip } from "@/lib/types";
import BookingAlert from "./booking-alert";
import MapView from "./map-view";
import DriverStats from "./driver-stats";
import TripInfo from "./trip-info";
import PinEntryDialog from "./pin-entry-dialog";
import { useToast } from "@/hooks/use-toast";
import { useGeolocation } from "@/hooks/use-geolocation";
import { Button } from "./ui/button";

export type TripStage = 'DRIVING_TO_PICKUP' | 'AWAITING_PIN' | 'TRIP_IN_PROGRESS';

const CACHED_TRIP_KEY = "radcaptian_current_trip";

export default function DriverDashboard() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [acceptedTrip, setAcceptedTrip] = useState<BookingRequest | null>(null);
  const [tripStage, setTripStage] = useState<TripStage | null>(null);
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const { toast } = useToast();
  const { currentLocation } = useGeolocation();
  const router = useRouter();

  const { bookingRequest, clearBooking } = useBookingSimulation(isAvailable, !!acceptedTrip, currentLocation);
  
  const handleAccept = () => {
    if (bookingRequest) {
      setAcceptedTrip(bookingRequest);
      setTripStage('DRIVING_TO_PICKUP');

      // Cache the trip details in localStorage
      try {
        const tripToCache = {
            pickupLocation: bookingRequest.pickupLocation,
            destination: bookingRequest.destination,
        };
        localStorage.setItem(CACHED_TRIP_KEY, JSON.stringify(tripToCache));
      } catch (error) {
        console.error("Failed to cache trip data:", error);
      }

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

  const clearTripData = () => {
    setAcceptedTrip(null);
    setTripStage(null);
    try {
        localStorage.removeItem(CACHED_TRIP_KEY);
    } catch (error) {
        console.error("Failed to remove cached trip data:", error);
    }
  };


  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    if (!checked) {
      clearBooking();
      clearTripData();
    }
  };

  const completeTrip = () => {
    if (acceptedTrip) {
      const completedTrip: Trip = {
        ...acceptedTrip,
        status: 'completed',
        finalFare: acceptedTrip.fareEstimate,
        tip: Math.floor(Math.random() * (acceptedTrip.fareEstimate * 0.25)),
        timestamp: new Date().toISOString(),
      };
      setTripHistory(prev => [completedTrip, ...prev]);
      clearTripData();
    }
  }

  const handleArrived = () => {
    setTripStage('AWAITING_PIN');
  };

  const handlePinVerified = () => {
    // For testing, just accept any 4 digit pin
    setTripStage('TRIP_IN_PROGRESS');
    toast({
        title: "PIN Verified!",
        description: "Trip started. Have a safe journey!",
    });
  };

  const handleEndTrip = () => {
    completeTrip();
    toast({
        title: "Trip Ended",
        description: "The trip has been successfully completed.",
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
        <div className="flex items-center gap-2">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">RadCaptian</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="availability-toggle" className={isAvailable ? "text-primary font-semibold" : "text-muted-foreground"}>
              {isAvailable ? "Online" : "Offline"}
            </Label>
            <Switch
              id="availability-toggle"
              checked={isAvailable}
              onCheckedChange={handleAvailabilityChange}
              disabled={!!acceptedTrip}
            />
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
              <LogOut className="h-5 w-5" />
          </Button>
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

        {acceptedTrip && tripStage === 'AWAITING_PIN' && (
            <PinEntryDialog 
                isOpen={tripStage === 'AWAITING_PIN'}
                onPinVerified={handlePinVerified}
                onClose={() => setTripStage('DRIVING_TO_PICKUP')} // Go back to pickup screen
            />
        )}
        
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
            {acceptedTrip && tripStage ? (
                <MapView 
                  trip={acceptedTrip} 
                  tripStage={tripStage}
                  driverLocation={currentLocation} 
                />
            ) : (
                <Card className="h-full flex items-center justify-center border-dashed">
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
                            <h2 className="text-2xl font-semibold">Looking for a ride...</h2>
                            <p>You'll be notified when a new request comes in.</p>
                        </>
                        )}
                    </div>
                    </CardContent>
                </Card>
            )}
        </div>
        <div className="lg:col-span-2 h-full overflow-y-auto">
             {acceptedTrip && tripStage ? (
                <TripInfo 
                  trip={acceptedTrip} 
                  tripStage={tripStage}
                  driverLocation={currentLocation}
                  onArrived={handleArrived}
                  onEndTrip={handleEndTrip} 
                />
             ) : (
                <DriverStats tripHistory={tripHistory} />
             )}
        </div>
      </main>
    </div>
  );
}
