
"use client";

import type { BookingRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { User, MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import RouteOptimizer from "./route-optimizer";

interface TripInfoProps {
  trip: BookingRequest;
  onEndTrip: () => void;
}

export default function TripInfo({ trip, onEndTrip }: TripInfoProps) {

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${trip.pickupLocation.lat},${trip.pickupLocation.lng}&destination=${trip.destination.lat},${trip.destination.lng}&travelmode=driving`;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Current Trip</CardTitle>
                <CardDescription>Active trip details.</CardDescription>
            </div>
            <Button asChild variant="outline" size="icon">
                <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="h-4 w-4" />
                    <span className="sr-only">Navigate</span>
                </Link>
            </Button>
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
          <p className="pl-6 text-sm">{trip.pickupLocation.name}</p>

          <div className="flex items-center gap-2 font-semibold pt-2">
            <MapPin className="w-4 h-4 text-red-500" /> 
            Destination
          </div>
          <p className="pl-6 text-sm">{trip.destination.name}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <RouteOptimizer trip={trip} />
        <Button variant="destructive" className="w-full" onClick={onEndTrip}>End Trip</Button>
      </CardFooter>
    </Card>
  );
}
