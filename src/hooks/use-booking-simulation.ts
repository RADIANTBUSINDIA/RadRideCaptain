
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { BookingRequest, Trip, Location } from '@/lib/types';
import * as Tone from 'tone';

const sampleBookings: Omit<BookingRequest, 'id'>[] = [
  {
    customerName: 'Aarav Sharma',
    pickupLocation: { name: 'Powerdbooks, Jayanagar 4th Block, Bengaluru', lat: 12.9299, lng: 77.5815 },
    destination: { name: 'Lalbagh Botanical Garden, Mavalli, Bengaluru', lat: 12.9507, lng: 77.5848 },
    fareEstimate: 350.50,
  },
  {
    customerName: 'Saanvi Gupta',
    pickupLocation: { name: 'Select CITYWALK, Saket District Centre, New Delhi', lat: 28.5284, lng: 77.2190 },
    destination: { name: 'Qutub Minar, Mehrauli, New Delhi', lat: 28.5245, lng: 77.1855 },
    fareEstimate: 280.75,
  },
  {
    customerName: 'Vihaan Singh',
    pickupLocation: { name: 'Nexus Mall, 6th Block, Koramangala, Bengaluru', lat: 12.9345, lng: 77.6370 },
    destination: { name: 'UB City, Vittal Mallya Road, Bengaluru', lat: 12.9721, lng: 77.5946 },
    fareEstimate: 180.00,
  },
  {
    customerName: 'Myra Patel',
    pickupLocation: { name: 'Express Avenue, Royapettah, Chennai', lat: 13.0594, lng: 80.2635 },
    destination: { name: 'Marina Beach, Triplicane, Chennai', lat: 13.0505, lng: 80.2825 },
    fareEstimate: 210.25,
  },
  {
    customerName: 'Advik Kumar',
    pickupLocation: { name: 'Howrah Bridge, Jagannath Ghat, Kolkata', lat: 22.5852, lng: 88.3458 },
    destination: { name: 'Victoria Memorial, Queens Way, Kolkata', lat: 22.5448, lng: 88.3426 },
    fareEstimate: 150.00,
  },
];

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


export function useBookingSimulation(isAvailable: boolean, hasActiveTrip: boolean, driverLocation: Location | null) {
  const [bookingRequest, setBookingRequest] = useState<BookingRequest | null>(null);

  const clearBooking = useCallback(() => {
    setBookingRequest(null);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const createNewBooking = async () => {
        if (!driverLocation) return;

        const potentialBookings = sampleBookings.filter(booking => {
            const pickupDistance = getDistanceInKm(driverLocation, booking.pickupLocation);
            const tripDistance = getDistanceInKm(booking.pickupLocation, booking.destination);
            // Ride is valid if pickup is within 20km and total trip is less than 50km
            return pickupDistance < 20 && tripDistance < 50;
        });

        if (potentialBookings.length === 0) {
            // No suitable rides found, try again later
            const randomDelay = Math.random() * 2000 + 1000; // 1-3 seconds
            timer = setTimeout(createNewBooking, randomDelay);
            return;
        }

      const randomBooking = potentialBookings[Math.floor(Math.random() * potentialBookings.length)];
      setBookingRequest({
        ...randomBooking,
        id: new Date().toISOString(),
      });
      try {
        await Tone.start();
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C5", "8n", Tone.now());
        synth.triggerAttackRelease("G5", "8n", Tone.now() + 0.2);
      } catch (e) {
        console.error("Audio could not start: ", e);
      }
    };

    if (isAvailable && !bookingRequest && !hasActiveTrip && driverLocation) {
      // Shorten the delay to get more frequent ride requests.
      const randomDelay = Math.random() * 1000 + 500; // 0.5-1.5 seconds
      timer = setTimeout(createNewBooking, randomDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isAvailable, bookingRequest, hasActiveTrip, driverLocation]);

  return { bookingRequest, clearBooking };
}
