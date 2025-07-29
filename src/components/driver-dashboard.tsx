
"use client";

import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { WifiOff, Search, LoaderCircle } from "lucide-react";
import { useBookingSimulation } from "@/hooks/use-booking-simulation";
import type { BookingRequest, Trip } from "@/lib/types";
import BookingAlert from "./booking-alert";
import PinEntryDialog from "./pin-entry-dialog";
import { useToast } from "@/hooks/use-toast";
import DriverStats from "./driver-stats";
import TripInfo from "./trip-info";
import { useTripContext } from "@/context/trip-context";


export type TripStage = 'DRIVING_TO_PICKUP' | 'AWAITING_PIN' | 'TRIP_IN_PROGRESS';

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

export default function DriverDashboard() {
  const { toast } = useToast();
  const { 
    tripHistory, 
    addTripToHistory, 
    isAvailable, 
    setIsAvailable, 
    hasActiveTrip, 
    setHasActiveTrip,
    activeTrip,
    setActiveTrip,
    tripStage,
    setTripStage
  } = useTripContext();

  const { bookingRequest, clearBooking, driverLocation } = useBookingSimulation(isAvailable, !!activeTrip);
  
  useEffect(() => {
    setHasActiveTrip(!!activeTrip);
  }, [activeTrip, setHasActiveTrip]);


  const handleAccept = () => {
    if (bookingRequest) {
      const { countdown, ...tripData } = bookingRequest;
      setActiveTrip(tripData);
      setTripStage('DRIVING_TO_PICKUP');
      clearBooking();
    }
  };

  const handleDecline = () => {
    if (bookingRequest) {
      const { countdown, ...tripData } = bookingRequest;
      const rejectedTrip: Trip = {
        ...tripData,
        status: 'rejected',
        finalFare: 0,
        tip: 0,
        timestamp: new Date().toISOString(),
      };
      addTripToHistory(rejectedTrip);
      clearBooking();
    }
  };

  const clearTripData = () => {
    setActiveTrip(null);
    setTripStage(null);
  };


  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    if (!checked) {
      clearBooking();
      clearTripData();
    }
  };

  const completeTrip = () => {
    if (activeTrip) {
      const completedTrip: Trip = {
        ...activeTrip,
        status: 'completed',
        finalFare: activeTrip.fareEstimate,
        tip: Math.floor(Math.random() * (activeTrip.fareEstimate * 0.25)),
        timestamp: new Date().toISOString(),
      };
      addTripToHistory(completedTrip);
      clearTripData();
    }
  }

  const handleArrived = () => {
    setTripStage('AWAITING_PIN');
  };

  const handlePinVerified = () => {
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

  const timeToPickup = bookingRequest ? Math.round((haversineDistance(driverLocation.lat, driverLocation.lng, bookingRequest.pickupLocation.lat, bookingRequest.pickupLocation.lng) / 25) * 60) : 0;

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      
        {bookingRequest && (
          <BookingAlert
            bookingRequest={bookingRequest}
            timeToPickup={timeToPickup}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}

        {activeTrip && tripStage === 'AWAITING_PIN' && (
            <PinEntryDialog 
                isOpen={tripStage === 'AWAITING_PIN'}
                onPinVerified={handlePinVerified}
                onClose={() => setTripStage('DRIVING_TO_PICKUP')}
            />
        )}

        <Card>
            <CardContent className="p-4 flex justify-between items-center">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Ready to Drive?</h2>
                    <p className="text-sm text-muted-foreground">Toggle to start receiving ride requests.</p>
                </div>
                <div className="flex items-center space-x-2">
                    {isAvailable && !hasActiveTrip && <LoaderCircle className="w-5 h-5 animate-spin" />}
                    <Label htmlFor="availability-toggle" className="font-semibold text-lg">
                        {isAvailable ? "Online" : "Offline"}
                    </Label>
                    <Switch
                        id="availability-toggle"
                        checked={isAvailable}
                        onCheckedChange={handleAvailabilityChange}
                        disabled={hasActiveTrip}
                        className="data-[state=checked]:bg-green-500"
                    />
                </div>
            </CardContent>
        </Card>
        
        {activeTrip && tripStage ? (
             <div className="h-auto">
                <TripInfo 
                  trip={activeTrip} 
                  tripStage={tripStage}
                  onArrived={handleArrived}
                  onEndTrip={handleEndTrip} 
                />
             </div>
            ) : (
                <div className="h-auto">
                    <Card className="h-full flex items-center justify-center border-dashed min-h-[200px]">
                        <CardContent className="p-0">
                        <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
                            {!isAvailable ? (
                            <>
                                <WifiOff className="w-16 h-16" />
                                <h2 className="text-2xl font-semibold">You Are Offline</h2>
                                <p>Toggle the switch above to go online.</p>
                            </>
                            ) : (
                            <>
                                <Search className="w-16 h-16" />
                                <h2 className="text-2xl font-semibold">Searching for Rides</h2>
                                <p>You'll be notified when a new request comes in.</p>
                            </>
                            )}
                        </div>
                        </CardContent>
                    </Card>
                </div>
        )}
      <div className="grid gap-4 md:gap-8">
        <DriverStats tripHistory={tripHistory} />
      </div>
    </div>
  );
}
