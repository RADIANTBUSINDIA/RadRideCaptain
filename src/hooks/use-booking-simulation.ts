
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { BookingRequest, Trip, Location } from '@/lib/types';
import * as Tone from 'tone';

const sampleBookings: Omit<BookingRequest, 'id' | 'riderPin'>[] = [
  {
    customerName: 'Mr. Sterling',
    pickupLocation: { name: 'Dubai Marina Yacht Club', lat: 25.0763, lng: 55.1384 },
    destination: { name: 'Palm Jumeirah, Atlantis', lat: 25.1304, lng: 55.1171 },
    fareEstimate: 3500.00,
  },
  {
    customerName: 'The Al-Fahim Family',
    pickupLocation: { name: 'Jumeirah Beach Hotel', lat: 25.1912, lng: 55.2341 },
    destination: { name: 'Burj Al Arab', lat: 25.1412, lng: 55.1852 },
    fareEstimate: 2800.75,
  },
  {
    customerName: 'Ms. Anya Sharma',
    pickupLocation: { name: 'One&Only The Palm', lat: 25.1132, lng: 55.1305 },
    destination: { name: 'Ain Dubai', lat: 25.0799, lng: 55.1228 },
    fareEstimate: 1800.00,
  },
  {
    customerName: 'Mr. Chen',
    pickupLocation: { name: 'The Ritz-Carlton, Dubai', lat: 25.0845, lng: 55.1408 },
    destination: { name: 'World Islands', lat: 25.2222, lng: 55.1715 },
    fareEstimate: 5210.25,
  },
  {
    customerName: 'The Knightsbridge Group',
    pickupLocation: { name: 'Bulgari Yacht Club', lat: 25.1950, lng: 55.2415 },
    destination: { name: 'Dubai Canal', lat: 25.1986, lng: 55.2589 },
    fareEstimate: 4150.00,
  },
];

// Haversine formula to calculate distance between two lat/lng points
export function getDistanceInKm(loc1: Location, loc2: Location) {
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


export function useBookingSimulation(isAvailable: boolean, hasActiveTrip: boolean) {
  const [bookingRequest, setBookingRequest] = useState<BookingRequest | null>(null);

  const clearBooking = useCallback(() => {
    setBookingRequest(null);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const createNewBooking = async () => {
      const randomBooking = sampleBookings[Math.floor(Math.random() * sampleBookings.length)];
      setBookingRequest({
        ...randomBooking,
        id: new Date().toISOString(),
        riderPin: String(Math.floor(1000 + Math.random() * 9000)), // Generate 4-digit PIN
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

    if (isAvailable && !bookingRequest && !hasActiveTrip) {
      const randomDelay = Math.random() * 3000 + 2000; // 2-5 seconds
      timer = setTimeout(createNewBooking, randomDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isAvailable, bookingRequest, hasActiveTrip]);

  return { bookingRequest, clearBooking };
}
