
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { BookingRequest } from '@/lib/types';
import * as Tone from 'tone';

const indianCustomerNames = [
  "Aarav Sharma", "Vivaan Singh", "Aditya Kumar", "Vihaan Gupta", "Arjun Patel",
  "Sai Reddy", "Reyansh Joshi", "Krishna Nair", "Ishaan Mehta", "Shaurya Iyer",
  "Diya Sharma", "Saanvi Singh", "Aanya Kumar", "Aadya Gupta", "Ananya Patel",
  "Pari Reddy", "Myra Joshi", "Anika Nair", "Kiara Mehta", "Sia Iyer"
];

const bangaloreLocations = [
    "123, Lalbagh Road, Mavalli, Bengaluru, Karnataka 560004",
    "Kasturba Road, Sampangi Rama Nagara, Bengaluru, Karnataka 560001",
    "Mahatma Gandhi Road, Shivaji Nagar, Bengaluru, Karnataka 560001",
    "1st Main Road, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    "80 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    "Dr. Ambedkar Veedhi, Sampangi Rama Nagara, Bengaluru, Karnataka 560001",
    "Palace Road, Vasanth Nagar, Bengaluru, Karnataka 560052",
    "Commercial Street, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001",
    "24, Vittal Mallya Road, KG Halli, D' Souza Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
    "Bannerghatta Main Road, Bannerghatta, Bengaluru, Karnataka 560083",
    "19th Main Road, Sector 3, HSR Layout, Bengaluru, Karnataka 560102",
    "Marathahalli Bridge, Marathahalli, Bengaluru, Karnataka 560037",
    "ITPL Main Road, Whitefield, Bengaluru, Karnataka 560066",
    "Hosur Road, Electronic City, Bengaluru, Karnataka 560100",
    "4th Block, Jayanagar, Bengaluru, Karnataka 560011",
    "6th Phase, JP Nagar, Bengaluru, Karnataka 560078",
    "Bull Temple Road, Basavanagudi, Bengaluru, Karnataka 560004",
    "8th Cross Road, Malleswaram, Bengaluru, Karnataka 560003",
    "Kempegowda Bus Station, Majestic, Bengaluru, Karnataka 560009",
    "Russel Market, Shivajinagar, Bengaluru, Karnataka 560051"
];


export function useBookingSimulation(isAvailable: boolean, hasActiveTrip: boolean) {
  const [bookingRequest, setBookingRequest] = useState<BookingRequest | null>(null);

  const clearBooking = useCallback(() => {
    setBookingRequest(null);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let isCancelled = false;

    const createNewBooking = async () => {
      
      const pickupLocation = bangaloreLocations[Math.floor(Math.random() * bangaloreLocations.length)];
      let destination = bangaloreLocations[Math.floor(Math.random() * bangaloreLocations.length)];
      while(pickupLocation === destination) {
        destination = bangaloreLocations[Math.floor(Math.random() * bangaloreLocations.length)];
      }

      const randomCustomerName = indianCustomerNames[Math.floor(Math.random() * indianCustomerNames.length)];

      const distance = Math.random() * (50 - 1) + 1; // 1 to 50 km
      const fareEstimate = 50 + (distance * 15); // Base fare + per km charge
      const estimatedTime = Math.round((distance / 25) * 60); // Assuming average speed of 25 km/h

      if (!isCancelled) {
        setBookingRequest({
            id: new Date().toISOString(),
            customerName: randomCustomerName,
            pickupLocation,
            destination,
            fareEstimate: parseFloat(fareEstimate.toFixed(2)),
            estimatedTime,
            distance: parseFloat(distance.toFixed(1)),
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

    if (isAvailable && !bookingRequest && !hasActiveTrip) {
      const randomDelay = Math.random() * 3000 + 2000; // 2-5 seconds
      timer = setTimeout(createNewBooking, randomDelay);
    }

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [isAvailable, bookingRequest, hasActiveTrip]);



  return { bookingRequest, clearBooking };
}
