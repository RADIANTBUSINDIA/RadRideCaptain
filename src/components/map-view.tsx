"use client";

import React from "react";
import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import type { BookingRequest, Location } from "@/lib/types";
import type { TripStage } from "./driver-dashboard";

interface MapViewProps {
  trip: BookingRequest;
  tripStage: TripStage;
  driverLocation: Location | null;
}

interface DirectionsRendererProps {
  origin: Location;
  destination: Location;
}

const DirectionsRenderer = ({ origin, destination }: DirectionsRendererProps) => {
    const map = useMap();
    const directionsService = React.useRef<google.maps.DirectionsService | null>(null);
    const directionsRenderer = React.useRef<google.maps.DirectionsRenderer | null>(null);

    React.useEffect(() => {
        if (!map) return;
        if (!directionsService.current) {
            directionsService.current = new google.maps.DirectionsService();
        }
        if (!directionsRenderer.current) {
            directionsRenderer.current = new google.maps.DirectionsRenderer({ suppressMarkers: true });
            directionsRenderer.current.setMap(map);
        }

        const request: google.maps.DirectionsRequest = {
            origin: new google.maps.LatLng(origin.lat, origin.lng),
            destination: new google.maps.LatLng(destination.lat, destination.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.current.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.current?.setDirections(result);
            } else {
                console.error(`Directions request failed due to ${status}`);
            }
        });

        // Cleanup on unmount
        return () => {
            if (directionsRenderer.current) {
                directionsRenderer.current.setMap(null);
                directionsRenderer.current = null;
            }
        };

    }, [map, origin, destination]);

    return null;
}

export default function MapView({ trip, tripStage, driverLocation }: MapViewProps) {
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
  
  const origin = tripStage === 'DRIVING_TO_PICKUP' && driverLocation ? driverLocation : pickupLocation;
  const target = tripStage === 'DRIVING_TO_PICKUP' ? pickupLocation : destination;

  const center = driverLocation || pickupLocation;

  return (
    <Card className="h-full w-full overflow-hidden relative">
      <APIProvider apiKey={apiKey}>
        <Map
          center={center}
          zoom={12}
          mapId="radcaptian-map"
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
          <DirectionsRenderer origin={origin} destination={target} />
        </Map>
      </APIProvider>
    </Card>
  );
}
