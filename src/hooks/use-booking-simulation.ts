"use client";

import { useState, useEffect, useCallback } from 'react';
import type { BookingRequest } from '@/lib/types';
import * as Tone from 'tone';

const sampleBookings: Omit<BookingRequest, 'id'>[] = [
  {
    customerName: 'Alice Johnson',
    pickupLocation: { name: '123 Main St, Anytown, USA', lat: 34.0522, lng: -118.2437 },
    destination: { name: '456 Oak Ave, Anytown, USA', lat: 34.0622, lng: -118.2537 },
    fareEstimate: 25.50,
  },
  {
    customerName: 'Bob Williams',
    pickupLocation: { name: '789 Pine Ln, Anytown, USA', lat: 34.0422, lng: -118.2637 },
    destination: { name: '101 Maple Dr, Anytown, USA', lat: 34.0552, lng: -118.2337 },
    fareEstimate: 18.75,
  },
  {
    customerName: 'Charlie Brown',
    pickupLocation: { name: '222 Elm St, Metro City', lat: 34.0722, lng: -118.2437 },
    destination: { name: '333 Birch Rd, Metro City', lat: 34.0822, lng: -118.2587 },
    fareEstimate: 32.00,
  },
];

export function useBookingSimulation(isAvailable: boolean) {
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
      });
      // Play sound after user interaction context is established
      try {
        await Tone.start();
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C5", "8n", Tone.now());
        synth.triggerAttackRelease("G5", "8n", Tone.now() + 0.2);
      } catch (e) {
        console.error("Audio could not start: ", e);
      }
    };

    if (isAvailable && !bookingRequest) {
      const randomDelay = Math.random() * 5000 + 3000; // 3-8 seconds
      timer = setTimeout(createNewBooking, randomDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isAvailable, bookingRequest]);

  return { bookingRequest, clearBooking };
}
