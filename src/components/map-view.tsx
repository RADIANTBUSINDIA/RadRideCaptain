"use client";

import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import type { BookingRequest } from "@/lib/types";

interface MapViewProps {
  trip: BookingRequest;
}

export default function MapView({ trip }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
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
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

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
  
  const center = currentLocation ? currentLocation : {
    lat: (pickupLocation.lat + destination.lat) / 2,
    lng: (pickupLocation.lng + destination.lng) / 2,
  };

  return (
    <Card className="h-full w-full overflow-hidden">
      <APIProvider apiKey={apiKey}>
        <Map
          center={center}
          zoom={12}
          mapId="driversidekick-map"
          className="w-full h-full"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {currentLocation && (
            <AdvancedMarker position={currentLocation} title={"Your Location"}>
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
    </Card>
  );
}
