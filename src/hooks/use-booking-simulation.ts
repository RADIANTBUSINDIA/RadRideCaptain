
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { BookingRequest, Location } from '@/lib/types';
import * as Tone from 'tone';

const indianCustomerNames = [
  "Aarav Sharma", "Vivaan Singh", "Aditya Kumar", "Vihaan Gupta", "Arjun Patel",
  "Sai Reddy", "Reyansh Joshi", "Krishna Nair", "Ishaan Mehta", "Shaurya Iyer",
  "Diya Sharma", "Saanvi Singh", "Aanya Kumar", "Aadya Gupta", "Ananya Patel",
  "Pari Reddy", "Myra Joshi", "Anika Nair", "Kiara Mehta", "Sia Iyer"
];

const dubaiLocations = [
    "Burj Khalifa", "The Dubai Mall", "Dubai Marina", "Palm Jumeirah", "Jumeirah Beach Residence (JBR)",
    "Downtown Dubai", "Business Bay", "Deira City Centre", "Mall of the Emirates", "Dubai International Airport (DXB)",
    "Al Karama", "Jumeirah Lakes Towers (JLT)", "Dubai Creek", "The Walk at JBR", "La Mer", "City Walk",
    "Dubai Frame", "Global Village", "Miracle Garden", "Kite Beach"
];


// Generates a random coordinate within a certain radius (in km) from a center point
function generateRandomPoint(center: Location, radius: number): Location {
    const y0 = center.lat;
    const x0 = center.lng;

    // Convert radius from kilometers to degrees
    const rd = radius / 111.32; // 1 degree of latitude is approx 111.32 km

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    // Adjust the x-coordinate for the shrinking of the east-west distances
    const new_x = x / Math.cos(y0 * Math.PI / 180);

    const randomLocationName = dubaiLocations[Math.floor(Math.random() * dubaiLocations.length)];

    return {
        name: randomLocationName,
        lat: y + y0,
        lng: new_x + x0,
    };
}

// Haversine formula to calculate distance between two lat/lng points
function getDistanceInKm(loc1: Location, loc2: Location) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(loc2.lat - loc1.lat);
    const dLon = deg2rad(loc2.lng - loc1.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}


export function useBookingSimulation(isAvailable: boolean, hasActiveTrip: boolean, currentLocation: Location | null) {
  const [bookingRequest, setBookingRequest] = useState<BookingRequest | null>(null);

  const clearBooking = useCallback(() => {
    setBookingRequest(null);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let isCancelled = false;

    const createNewBooking = async () => {
      // Use the current location if available, otherwise default to a location in Dubai
      const baseLocation = currentLocation || { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 };
      
      let pickupLocation, destination, driverToPickupDistance, pickupToDropoffDistance;
      let isValidRequest = false;

      // Keep generating requests until one meets the criteria
      do {
        pickupLocation = generateRandomPoint(baseLocation, 1); // Generate pickup within 1km radius for more chances
        destination = generateRandomPoint(pickupLocation, 55); // Generate up to 55km to have some drops over 50km
        
        driverToPickupDistance = getDistanceInKm(baseLocation, pickupLocation);
        pickupToDropoffDistance = getDistanceInKm(pickupLocation, destination);

        // Check if the generated request is valid
        if (driverToPickupDistance <= 0.5 && pickupToDropoffDistance <= 50) {
            isValidRequest = true;
        }

      } while (!isValidRequest);


      const randomCustomerName = indianCustomerNames[Math.floor(Math.random() * indianCustomerNames.length)];

      // Estimate fare based on a simple distance calculation
      const fareEstimate = 50 + (pickupToDropoffDistance * 15); // Base fare + per km charge

      if (!isCancelled) {
        setBookingRequest({
            id: new Date().toISOString(),
            customerName: randomCustomerName,
            pickupLocation,
            destination,
            fareEstimate: parseFloat(fareEstimate.toFixed(2)),
            riderPin: String(Math.floor(1000 + Math.random() * 9000)),
        });

        try {
            await Tone.start();
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease("C5", "8n", Tone.now());
            synth.triggerAttackRelease("G5", "8n", Tone.now() + 0.2);
        } catch (e) {
            console.error("Audio could not start: ", e);
        }
      }
    };

    if (isAvailable && !bookingRequest && !hasActiveTrip && currentLocation) {
      const randomDelay = Math.random() * 3000 + 2000; // 2-5 seconds
      timer = setTimeout(createNewBooking, randomDelay);
    }

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [isAvailable, bookingRequest, hasActiveTrip, currentLocation]);



  return { bookingRequest, clearBooking };
}
