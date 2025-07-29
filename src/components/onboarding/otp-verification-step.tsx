
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface OtpVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: { otp: string }) => void;
  phone: string;
}

export default function OtpVerificationStep({ onNext, onBack, updateFormData, phone }: OtpVerificationStepProps) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResendOtp = () => {
    // Simulate resending OTP
    setIsResending(true);
    // In a real app, you would make an API call here.
    console.log("Resending OTP to", phone);
    setTimeout(() => {
      setTimer(30);
      setIsResending(false);
    }, 1500);
  };
  
  const handleVerify = () => {
    // In a real app, you'd verify the OTP with a backend service.
    // For this simulation, we'll just check if it's 4 digits.
    updateFormData({ otp });
    onNext();
  };

  return (
    <div className="flex flex-col">
       <Button variant="ghost" size="icon" className="self-start mb-6" onClick={onBack}>
            <ArrowLeft />
        </Button>

      <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
      <p className="text-muted-foreground mb-6">
        We've sent a 4-digit code to +91 {phone}. 
        <Button variant="link" className="p-1" onClick={onBack}>Wrong number?</Button>
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="otp" className="sr-only">One-Time Password (OTP)</Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter 4-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
          maxLength={4}
          className="h-12 text-center text-lg tracking-[0.5em]"
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button 
            variant="link" 
            onClick={handleResendOtp}
            disabled={timer > 0 || isResending}
            >
            {isResending ? "Resending..." : "Resend OTP"}
        </Button>
        {timer > 0 && <span className="text-sm text-muted-foreground">in 0:{timer.toString().padStart(2, '0')}</span>}
      </div>
      
      <div className="mt-8">
        <Button onClick={handleVerify} disabled={otp.length !== 4} className="w-full bg-accent hover:bg-accent/90 h-12 text-base font-semibold">
          Verify & Continue
        </Button>
      </div>
    </div>
  );
}
