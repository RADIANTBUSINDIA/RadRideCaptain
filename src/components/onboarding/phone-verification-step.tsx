"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: { phone: string; otp: string }) => void;
  phone: string;
}

export default function PhoneVerificationStep({ onNext, onBack, updateFormData, phone }: PhoneVerificationStepProps) {
  const [localPhone, setLocalPhone] = useState(phone);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    // Simulate sending OTP
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    updateFormData({ phone: localPhone, otp });
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Phone Verification</h2>
      <p className="text-muted-foreground mb-6">
        {otpSent ? "Enter the OTP sent to your phone." : "We'll send you a one-time password."}
      </p>
      
      {!otpSent ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your 10-digit phone number"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength={10}
            />
          </div>
          <Button onClick={handleSendOtp} disabled={localPhone.length !== 10} className="w-full bg-accent hover:bg-accent/90">Send OTP</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter the 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
            />
             <p className="text-xs text-muted-foreground text-center pt-2">For simulation, you can enter any 4 digits.</p>
          </div>
          <Button onClick={handleVerifyOtp} disabled={otp.length !== 4} className="w-full bg-accent hover:bg-accent/90">Verify & Continue</Button>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
