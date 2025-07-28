
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Trip } from '@/lib/types';
import { database } from '@/lib/firebase';
import { ref, onValue, push, set } from 'firebase/database';


const DRIVER_ID = "driver_001"; // In a real app, this would be dynamic based on auth

interface TripContextType {
  tripHistory: Trip[];
  addTripToHistory: (trip: Trip) => void;
  isAvailable: boolean;
  setIsAvailable: (isAvailable: boolean) => void;
  hasActiveTrip: boolean;
  setHasActiveTrip: (hasActiveTrip: boolean) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasActiveTrip, setHasActiveTrip] = useState(false);

  // Load trip history from Firebase Realtime Database
  useEffect(() => {
    const tripsRef = ref(database, `trips/${DRIVER_ID}`);
    const unsubscribe = onValue(tripsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const history: Trip[] = Object.values(data);
            // Firebase returns objects, converting to array and sorting by timestamp
            const sortedHistory = history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setTripHistory(sortedHistory);
        } else {
            setTripHistory([]);
        }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  const addTripToHistory = (trip: Trip) => {
    // A new trip is pushed to the database, and the onValue listener will update the state
    const tripsRef = ref(database, `trips/${DRIVER_ID}`);
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
        setHasActiveTrip
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
