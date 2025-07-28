
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

const bangaloreLocations: Location[] = [
    { address: "123, Lalbagh Road, Mavalli, Bengaluru", lat: 12.95, lng: 77.58 },
    { address: "Kasturba Road, Sampangi Rama Nagara, Bengaluru", lat: 12.97, lng: 77.59 },
    { address: "Mahatma Gandhi Road, Shivaji Nagar, Bengaluru", lat: 12.97, lng: 77.60 },
    { address: "1st Main Road, 5th Block, Koramangala, Bengaluru", lat: 12.93, lng: 77.62 },
    { address: "80 Feet Road, Indiranagar, Bengaluru", lat: 12.97, lng: 77.64 },
    { address: "Dr. Ambedkar Veedhi, Sampangi Rama Nagara, Bengaluru", lat: 12.98, lng: 77.59 },
    { address: "Palace Road, Vasanth Nagar, Bengaluru", lat: 12.99, lng: 77.58 },
    { address: "Commercial Street, Tasker Town, Shivaji Nagar, Bengaluru", lat: 12.98, lng: 77.60 },
    { address: "24, Vittal Mallya Road, Ashok Nagar, Bengaluru", lat: 12.97, lng: 77.59 },
    { address: "Bannerghatta Main Road, Bannerghatta, Bengaluru", lat: 12.86, lng: 77.58 },
    { address: "19th Main Road, Sector 3, HSR Layout, Bengaluru", lat: 12.91, lng: 77.64 },
    { address: "Marathahalli Bridge, Marathahalli, Bengaluru", lat: 12.95, lng: 77.69 },
    { address: "ITPL Main Road, Whitefield, Bengaluru", lat: 12.98, lng: 77.74 },
    { address: "Hosur Road, Electronic City, Bengaluru", lat: 12.84, lng: 77.66 },
    { address: "4th Block, Jayanagar, Bengaluru", lat: 12.92, lng: 77.58 },
    { address: "6th Phase, JP Nagar, Bengaluru", lat: 12.90, lng: 77.59 },
    { address: "Bull Temple Road, Basavanagudi, Bengaluru", lat: 12.94, lng: 77.57 },
    { address: "8th Cross Road, Malleswaram, Bengaluru", lat: 12.99, lng: 77.56 },
    { address: "Kempegowda Bus Station, Majestic, Bengaluru", lat: 12.97, lng: 77.57 },
    { address: "Russel Market, Shivajinagar, Bengaluru", lat: 12.98, lng: 77.60 }
];

const paymentModes: ('Cash' | 'Card' | 'UPI')[] = ['Cash', 'Card', 'UPI'];
const rideTypes: ('Standard' | 'Pool' | 'Rental')[] = ['Standard', 'Pool', 'Rental'];


function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

export function useBookingSimulation(isAvailable: boolean, hasActiveTrip: boolean) {
  const [bookingRequest, setBookingRequest] = useState<BookingRequest | null>(null);
  const [driverLocation] = useState<Location>(() => bangaloreLocations[Math.floor(Math.random() * bangaloreLocations.length)]);

  const clearBooking = useCallback(() => {
    setBookingRequest(null);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let isCancelled = false;

    const createNewBooking = async () => {
      
      const pickupLocation = bangaloreLocations[Math.floor(Math.random() * bangaloreLocations.length)];
      let destination = bangaloreLocations[Math.floor(Math.random() * bangaloreLocations.length)];
      while(pickupLocation.address === destination.address) {
        destination = bangaloreLocations[Math.floor(Math.random() * bangaloreLocations.length)];
      }

      const randomCustomerName = indianCustomerNames[Math.floor(Math.random() * indianCustomerNames.length)];
      
      const distance = haversineDistance(pickupLocation.lat, pickupLocation.lng, destination.lat, destination.lng);
      const fareEstimate = 50 + (distance * 15); // Base fare + per km charge
      const estimatedTime = Math.round((distance / 25) * 60); // Assuming average speed of 25 km/h
      const riderRating = parseFloat((Math.random() * (5 - 4) + 4).toFixed(1));
      const paymentMode = paymentModes[Math.floor(Math.random() * paymentModes.length)];
      const rideType = rideTypes[Math.floor(Math.random() * rideTypes.length)];

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
            riderRating,
            paymentMode,
            rideType,
            countdown: 15,
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

  useEffect(() => {
    if (bookingRequest && bookingRequest.countdown > 0) {
      const countdownTimer = setInterval(() => {
        setBookingRequest(prev => {
          if (prev && prev.countdown > 1) {
            return { ...prev, countdown: prev.countdown - 1 };
          } else if (prev && prev.countdown === 1) {
            clearInterval(countdownTimer);
            clearBooking();
          }
          return prev;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [bookingRequest, clearBooking]);



  return { bookingRequest, clearBooking, driverLocation };
}
