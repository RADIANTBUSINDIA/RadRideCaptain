"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import type { BookingRequest, Location } from "@/lib/types";

interface MapViewProps {
  trip: BookingRequest;
  onEndTrip: () => void;
  driverLocation: Location | null;
}

export default function MapView({ trip, onEndTrip, driverLocation }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card className="h-full flex items-center justify-center bg-muted">
        <CardContent className="text-center text-muted-foreground p-6">
          <p className="font-semibold">Map not available</p>
          <p className="text-sm">
            Google Maps API Key is not configured. Please add it to your environment variables.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { pickupLocation, destination } = trip;
  
  const center = driverLocation ? driverLocation : {
    lat: (pickupLocation.lat + destination.lat) / 2,
    lng: (pickupLocation.lng + destination.lng) / 2,
  };

  return (
    <Card className="h-full w-full overflow-hidden relative">
      <APIProvider apiKey={apiKey}>
        <Map
          center={center}
          zoom={12}
          mapId="driversidekick-map"
          className="w-full h-full"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {driverLocation && (
            <AdvancedMarker position={driverLocation} title={"Your Location"}>
              <div className="flex flex-col items-center justify-center p-2 bg-primary rounded-full shadow-lg">
                <Navigation className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
            </AdvancedMarker>
          )}
          <AdvancedMarker position={pickupLocation} title={"Pickup"}>
            <div className="flex flex-col items-center">
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full -mb-2 z-10 shadow">Pickup</span>
              <MapPin className="w-10 h-10 text-green-500" fill="currentColor" />
            </div>
          </AdvancedMarker>
          <AdvancedMarker position={destination} title={"Destination"}>
             <div className="flex flex-col items-center">
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full -mb-2 z-10 shadow">Dropoff</span>
              <MapPin className="w-10 h-10 text-red-500" fill="currentColor" />
            </div>
          </AdvancedMarker>
        </Map>
      </APIProvider>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button variant="destructive" size="lg" onClick={onEndTrip} className="shadow-lg">End Trip</Button>
      </div>
    </Card>
  );
}
