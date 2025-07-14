"use client";

import { useState, useEffect, useCallback } from 'react';
import type { BookingRequest, Trip } from '@/lib/types';
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

const sampleHistory: Omit<Trip, 'id' | 'customerName' | 'pickupLocation' | 'destination' | 'fareEstimate'>[] = [
    { status: 'completed', finalFare: 28.00, tip: 5.00, timestamp: '2023-10-27T10:00:00Z' },
    { status: 'completed', finalFare: 20.50, tip: 3.00, timestamp: '2023-10-27T11:30:00Z' },
    { status: 'rejected', finalFare: 0, tip: 0, timestamp: '2023-10-27T12:00:00Z' },
    { status: 'completed', finalFare: 35.00, tip: 7.50, timestamp: '2023-10-27T14:00:00Z' },
    { status: 'completed', finalFare: 15.25, tip: 2.00, timestamp: '2023-10-27T15:15:00Z' },
    { status: 'rejected', finalFare: 0, tip: 0, timestamp: '2023-10-27T16:00:00Z' },
    { status: 'completed', finalFare: 42.75, tip: 10.00, timestamp: '2023-10-27T17:45:00Z' },
];

export function generatePastTrips(): Trip[] {
    return sampleHistory.map((historyItem, index) => {
        const booking = sampleBookings[index % sampleBookings.length];
        return {
            ...booking,
            ...historyItem,
            id: new Date(historyItem.timestamp).toISOString() + Math.random(),
        }
    })
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

    if (isAvailable && !bookingRequest && !hasActiveTrip) {
      const randomDelay = Math.random() * 10000 + 10000; // 10-20 seconds
      timer = setTimeout(createNewBooking, randomDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isAvailable, bookingRequest, hasActiveTrip]);

  return { bookingRequest, clearBooking };
}
