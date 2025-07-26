
"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, LoaderCircle } from "lucide-react";
import { useBookingSimulation } from "@/hooks/use-booking-simulation";
import type { BookingRequest, Trip } from "@/lib/types";
import BookingAlert from "./booking-alert";
import PinEntryDialog from "./pin-entry-dialog";
import { useToast } from "@/hooks/use-toast";
import DriverStats from "./driver-stats";
import TripInfo from "./trip-info";


export type TripStage = 'DRIVING_TO_PICKUP' | 'AWAITING_PIN' | 'TRIP_IN_PROGRESS';

export default function DriverDashboard() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [acceptedTrip, setAcceptedTrip] = useState<BookingRequest | null>(null);
  const [tripStage, setTripStage] = useState<TripStage | null>(null);
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const { toast } = useToast();

  const { bookingRequest, clearBooking } = useBookingSimulation(isAvailable, !!acceptedTrip);
  
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
      setTripHistory(prev => [rejectedTrip, ...prev]);
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
      setTripHistory(prev => [completedTrip, ...prev]);
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
       <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Status</CardTitle>
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
            </CardHeader>
        </Card>

      <div className={`grid gap-4 md:gap-8 grid-cols-1 ${acceptedTrip ? 'md:grid-cols-1' : 'md:grid-cols-5'}`}>
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
             <div className="md:col-span-5 h-auto">
                <TripInfo 
                  trip={acceptedTrip} 
                  tripStage={tripStage}
                  onArrived={handleArrived}
                  onEndTrip={handleEndTrip} 
                />
             </div>
            ) : (
            <>
                <div className="md:col-span-3 h-[60vh] md:h-auto">
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
                </div>
                <div className="md:col-span-2 h-auto">
                    <div className="h-full rounded-lg border text-card-foreground shadow-sm flex items-center justify-center bg-muted/50">
                        <div className="p-6 pt-0 text-center text-muted-foreground">
                            <p>Your trip information will appear here once you accept a ride.</p>
                        </div>
                    </div>
                </div>
            </>
        )}
      </div>
      <div className="grid gap-4 md:gap-8">
        <DriverStats tripHistory={tripHistory} />
      </div>
    </div>
  );
}
