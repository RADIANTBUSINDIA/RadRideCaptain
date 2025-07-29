
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Trip, ActiveTrip } from '@/lib/types';
import type { TripStage } from '@/components/driver-dashboard';
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
  activeTrip: ActiveTrip | null;
  setActiveTrip: (trip: ActiveTrip | null) => void;
  tripStage: TripStage | null;
  setTripStage: (stage: TripStage | null) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const [isAvailable, setIsAvailableState] = useState(false);
  const [hasActiveTrip, setHasActiveTrip] = useState(false);
  const [driverId, setDriverId] = useState<string | null>(null);
  const [activeTrip, setActiveTripState] = useState<ActiveTrip | null>(null);
  const [tripStage, setTripStageState] = useState<TripStage | null>(null);


  useEffect(() => {
    try {
        const storedProfile = localStorage.getItem("driverProfile");
        if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            if(profile.id) {
                setDriverId(profile.id);
            }
        }
        const storedActiveTrip = localStorage.getItem("activeTrip");
        if (storedActiveTrip) {
            setActiveTripState(JSON.parse(storedActiveTrip));
        }
        const storedTripStage = localStorage.getItem("tripStage");
        if (storedTripStage) {
            setTripStageState(storedTripStage as TripStage);
        }
        const storedIsAvailable = localStorage.getItem("isAvailable");
        if (storedIsAvailable) {
            setIsAvailableState(JSON.parse(storedIsAvailable));
        }

    } catch (e) {
        console.error("Could not parse data from local storage", e);
    }
  }, []);

  const setActiveTrip = (trip: ActiveTrip | null) => {
    setActiveTripState(trip);
    if (trip) {
        localStorage.setItem("activeTrip", JSON.stringify(trip));
    } else {
        localStorage.removeItem("activeTrip");
    }
  };

  const setTripStage = (stage: TripStage | null) => {
    setTripStageState(stage);
    if (stage) {
        localStorage.setItem("tripStage", stage);
    } else {
        localStorage.removeItem("tripStage");
    }
  };

  const setIsAvailable = (available: boolean) => {
    setIsAvailableState(available);
    localStorage.setItem("isAvailable", JSON.stringify(available));
  }

  // Load trip history from Firebase Realtime Database
  useEffect(() => {
    if (!driverId) return;

    const tripsRef = ref(database, `drivers/${driverId}/rideHistory`);
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
    }, (error) => {
        console.error("Firebase read failed:", error);
        setTripHistory([]);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [driverId]);


  const addTripToHistory = (trip: Trip) => {
    if (!driverId) return;
    // A new trip is pushed to the database, and the onValue listener will update the state
    const newTripRef = push(ref(database, `drivers/${driverId}/rideHistory`));
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
        driverId,
        activeTrip,
        setActiveTrip,
        tripStage,
        setTripStage
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
