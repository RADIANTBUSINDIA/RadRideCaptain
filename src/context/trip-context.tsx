
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Trip } from '@/lib/types';

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

  const addTripToHistory = (trip: Trip) => {
    setTripHistory((prevHistory) => [trip, ...prevHistory]);
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
