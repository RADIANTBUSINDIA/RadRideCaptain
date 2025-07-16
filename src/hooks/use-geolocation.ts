
"use client";

import { useState, useEffect } from 'react';
import type { Location } from '@/lib/types';

const DEFAULT_LOCATION: Location = { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 };

export function useGeolocation() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  useEffect(() => {
    let watchId: number;

    const successCallback = (position: GeolocationPosition) => {
      setCurrentLocation({
        name: "Current Location",
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error("Error getting user location:", error.message);
      // Set to default location only if no location is set yet
      if (!currentLocation) {
        setCurrentLocation(DEFAULT_LOCATION);
      }
    };

    if (navigator.geolocation) {
      // Get initial position first
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });

      // Then watch for changes
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      if (!currentLocation) {
        setCurrentLocation(DEFAULT_LOCATION);
      }
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return { currentLocation };
}
