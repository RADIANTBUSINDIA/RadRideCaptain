
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Trip } from '@/lib/types';

const TRIP_HISTORY_STORAGE_KEY = 'tripHistory';

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

  // Load trip history from local storage on initial render
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(TRIP_HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setTripHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load trip history from local storage", error);
    }
  }, []);

  // Save trip history to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(TRIP_HISTORY_STORAGE_KEY, JSON.stringify(tripHistory));
    } catch (error) {
      console.error("Failed to save trip history to local storage", error);
    }
  }, [tripHistory]);


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
