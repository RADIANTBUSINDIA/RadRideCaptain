"use client";

import type { BookingRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { User, MapPin } from "lucide-react";

interface TripInfoProps {
  trip: BookingRequest;
  onEndTrip: () => void;
}

export default function TripInfo({ trip, onEndTrip }: TripInfoProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Current Trip</CardTitle>
        <CardDescription>Active trip details.</CardDescription>
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
          <p className="pl-6 text-sm">{trip.pickupLocation.name}</p>

          <div className="flex items-center gap-2 font-semibold pt-2">
            <MapPin className="w-4 h-4 text-red-500" /> 
            Destination
          </div>
          <p className="pl-6 text-sm">{trip.destination.name}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className="w-full" onClick={onEndTrip}>End Trip</Button>
      </CardFooter>
    </Card>
  );
}
