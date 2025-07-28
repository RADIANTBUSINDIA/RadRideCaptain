
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Trip } from '@/lib/types';
import { database } from '@/lib/firebase';
import { ref, onValue, push, set } from 'firebase/database';


interface TripContextType {
  tripHistory: Trip[];
  addTripToHistory: (trip: Trip) => void;
  isAvailable: boolean;
  setIsAvailable: (isAvailable: boolean) => void;
  hasActiveTrip: boolean;
  setHasActiveTrip: (hasActiveTrip: boolean) => void;
  driverId: string | null;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasActiveTrip, setHasActiveTrip] = useState(false);
  const [driverId, setDriverId] = useState<string | null>(null);

  useEffect(() => {
    try {
        const storedProfile = localStorage.getItem("driverProfile");
        if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            if(profile.id) {
                setDriverId(profile.id);
            }
        }
    } catch (e) {
        console.error("Could not parse driver profile from local storage", e);
    }
  }, []);

  // Load trip history from Firebase Realtime Database
  useEffect(() => {
    if (!driverId) return;

    // The current implementation saves trips directly under trips/{driverId}
    // but the new schema expects it under drivers/{driverId}/rideHistory
    // We will use the old path for now for backward compatibility and to not break the app
    const tripsRef = ref(database, `trips/${driverId}`);
    const unsubscribe = onValue(tripsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // The data is an object with push IDs as keys
            const history: Trip[] = Object.values(data);
            // Sorting by timestamp to show the latest trips first
            const sortedHistory = history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setTripHistory(sortedHistory);
        } else {
            setTripHistory([]);
        }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [driverId]);


  const addTripToHistory = (trip: Trip) => {
    if (!driverId) return;
    // A new trip is pushed to the database, and the onValue listener will update the state
    const tripsRef = ref(database, `trips/${driverId}`);
    const newTripRef = push(tripsRef);
    set(newTripRef, trip);
  };

  return (
    <TripContext.Provider value={{ 
        tripHistory, 
        addTripToHistory, 
        isAvailable, 
        setIsAvailable,
        hasActiveTrip,
        setHasActiveTrip,
        driverId
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};
