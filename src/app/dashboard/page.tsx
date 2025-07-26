
"use client";

import DriverDashboard from '@/components/driver-dashboard';
import { useEffect } from 'react';

interface DashboardPageProps {
    isAvailable: boolean;
    setIsAvailable: (isAvailable: boolean) => void;
    setHasActiveTrip: (hasActiveTrip: boolean) => void;
}

export default function DashboardPage({ isAvailable, setIsAvailable, setHasActiveTrip }: DashboardPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DriverDashboard 
        isAvailable={isAvailable} 
        setIsAvailable={setIsAvailable} 
        setHasActiveTrip={setHasActiveTrip} 
      />
    </main>
  );
}
