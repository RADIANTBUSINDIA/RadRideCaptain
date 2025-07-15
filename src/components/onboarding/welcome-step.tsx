"use client";

import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  
  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
       <div className="p-4 bg-primary/10 rounded-full mb-4 ring-8 ring-primary/5">
         <Car className="w-16 h-16 text-primary" />
       </div>
      <h1 className="text-4xl font-bold mb-2">Welcome to Rad Captian</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Your journey as a driver starts here. Let's get you set up to start earning.
      </p>
      <Button onClick={onNext} size="lg" className="bg-accent hover:bg-accent/90">
        Continue as Driver
      </Button>
    </div>
  );
}
