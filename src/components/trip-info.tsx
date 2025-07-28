
"use client";

import type { BookingRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { User, MapPin, Navigation, Pin } from "lucide-react";
import type { TripStage } from "./driver-dashboard";

interface TripInfoProps {
  trip: Omit<BookingRequest, 'countdown'>;
  tripStage: TripStage;
  onArrived: () => void;
  onEndTrip: () => void;
}

export default function TripInfo({ trip, tripStage, onArrived, onEndTrip }: TripInfoProps) {

  const renderCardTitle = () => {
      switch (tripStage) {
          case 'DRIVING_TO_PICKUP':
              return 'En Route to Pickup';
          case 'AWAITING_PIN':
              return 'Awaiting Rider PIN';
          case 'TRIP_IN_PROGRESS':
              return 'Trip in Progress';
          default:
              return 'Current Trip';
      }
  }

  const renderCardDescription = () => {
    switch (tripStage) {
        case 'DRIVING_TO_PICKUP':
            return 'Proceed to the customer pickup location.';
        case 'AWAITING_PIN':
            return 'Please collect the 4-digit PIN from the rider.';
        case 'TRIP_IN_PROGRESS':
            return 'Proceed to the destination.';
        default:
            return 'Active trip details.';
    }
  }

  const renderFooter = () => {
      switch (tripStage) {
          case 'DRIVING_TO_PICKUP':
              return <Button className="w-full bg-accent hover:bg-accent/90" onClick={onArrived}>Arrived at Pickup</Button>;
          case 'AWAITING_PIN':
              return <Button className="w-full" onClick={onArrived} disabled>Waiting for PIN verification...</Button>;
          case 'TRIP_IN_PROGRESS':
              return (
                  <>
                      <Button variant="destructive" className="w-full" onClick={onEndTrip}>End Trip</Button>
                  </>
              );
          default:
              return null;
      }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{renderCardTitle()}</CardTitle>
                <CardDescription>{renderCardDescription()}</CardDescription>
            </div>
            {tripStage !== 'AWAITING_PIN' && (
              <Button asChild variant="outline" size="icon" disabled>
                  <div>
                      <Navigation className="h-4 w-4" />
                      <span className="sr-only">Navigate</span>
                  </div>
              </Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-y-auto">
        <div className="space-y-2 p-3 border rounded-lg bg-card">
          <div className="flex items-center gap-2 font-semibold">
            <User className="w-4 h-4 text-primary" /> 
            Customer
          </div>
          <p className="pl-6 text-sm">{trip.customerName}</p>
          
          <div className="flex items-center gap-2 font-semibold pt-2">
            <MapPin className="w-4 h-4 text-green-500" /> 
            Pickup
          </div>
          <p className="pl-6 text-sm">{trip.pickupLocation.address}</p>

          <div className="flex items-center gap-2 font-semibold pt-2">
            <MapPin className="w-4 h-4 text-red-500" /> 
            Destination
          </div>
          <p className="pl-6 text-sm">{trip.destination.address}</p>
        </div>

        {tripStage === 'AWAITING_PIN' && (
            <div className="text-center p-4 border-dashed border-2 rounded-lg">
                <Pin className="mx-auto h-8 w-8 text-primary mb-2"/>
                <p className="font-semibold">Enter the 4-digit PIN</p>
                <p className="text-sm text-muted-foreground">Ask the rider for their PIN to start the trip.</p>
                <p className="text-sm text-muted-foreground mt-2">PIN for testing: <strong className="text-foreground">{trip.riderPin}</strong></p>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-6">
        {renderFooter()}
      </CardFooter>
    </Card>
  );
}
