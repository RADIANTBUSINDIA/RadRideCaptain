"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, User } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
  updateFormData: (data: { role: string }) => void;
}

export default function WelcomeStep({ onNext, updateFormData }: WelcomeStepProps) {
  const handleRoleSelection = (role: string) => {
    updateFormData({ role });
    onNext();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome to Rad Captian</h1>
      <p className="text-muted-foreground mb-8">
        Please select your role to get started.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="cursor-pointer hover:border-primary transition-all group"
          onClick={() => handleRoleSelection("Driver")}
        >
          <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary transition-all">
                <Car className="w-10 h-10 text-primary" />
              </div>
            <CardTitle>I'm a Driver</CardTitle>
            <CardDescription className="text-center">Sign up to drive and earn money on your schedule.</CardDescription>
          </CardHeader>
        </Card>
        <Card
          className="cursor-pointer hover:border-primary transition-all group"
          onClick={() => handleRoleSelection("Rider")}
        >
          <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary transition-all">
                <User className="w-10 h-10 text-primary" />
              </div>
            <CardTitle>I'm a Rider</CardTitle>
            <CardDescription className="text-center">Sign up to book rides and get to your destination safely.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
