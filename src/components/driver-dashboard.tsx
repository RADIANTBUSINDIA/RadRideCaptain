
"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, Search } from "lucide-react";
import { useBookingSimulation } from "@/hooks/use-booking-simulation";
import type { BookingRequest, Trip } from "@/lib/types";
import BookingAlert from "./booking-alert";
import PinEntryDialog from "./pin-entry-dialog";
import { useToast } from "@/hooks/use-toast";
import DriverStats from "./driver-stats";
import TripInfo from "./trip-info";
import { useTripContext } from "@/context/trip-context";


export type TripStage = 'DRIVING_TO_PICKUP' | 'AWAITING_PIN' | 'TRIP_IN_PROGRESS';

interface DriverDashboardProps {
    isAvailable: boolean;
    setIsAvailable: (isAvailable: boolean) => void;
    setHasActiveTrip: (hasActiveTrip: boolean) => void;
}

export default function DriverDashboard({ isAvailable, setIsAvailable, setHasActiveTrip }: DriverDashboardProps) {
  const [acceptedTrip, setAcceptedTrip] = useState<BookingRequest | null>(null);
  const [tripStage, setTripStage] = useState<TripStage | null>(null);
  const { toast } = useToast();
  const { tripHistory, addTripToHistory } = useTripContext();

  const { bookingRequest, clearBooking } = useBookingSimulation(isAvailable, !!acceptedTrip);
  
  useEffect(() => {
    setHasActiveTrip(!!acceptedTrip);
  }, [acceptedTrip, setHasActiveTrip]);


  const handleAccept = () => {
    if (bookingRequest) {
      setAcceptedTrip(bookingRequest);
      setTripStage('DRIVING_TO_PICKUP');
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
      addTripToHistory(rejectedTrip);
      clearBooking();
    }
  };

  const clearTripData = () => {
    setAcceptedTrip(null);
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
    if (acceptedTrip) {
      const completedTrip: Trip = {
        ...acceptedTrip,
        status: 'completed',
        finalFare: acceptedTrip.fareEstimate,
        tip: Math.floor(Math.random() * (acceptedTrip.fareEstimate * 0.25)),
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

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      
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
                onClose={() => setTripStage('DRIVING_TO_PICKUP')}
            />
        )}
        
        {acceptedTrip && tripStage ? (
             <div className="h-auto">
                <TripInfo 
                  trip={acceptedTrip} 
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
                                <p>Toggle the switch in the header to go online.</p>
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
