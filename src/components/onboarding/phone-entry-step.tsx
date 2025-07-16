

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface PhoneEntryStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: { phone: string }) => void;
  phone: string;
}

export default function PhoneEntryStep({ onNext, onBack, updateFormData, phone }: PhoneEntryStepProps) {
  const [localPhone, setLocalPhone] = useState(phone);

  const handleContinue = () => {
    updateFormData({ phone: localPhone });
    onNext();
  };

  return (
    <div className="flex flex-col">
        <Button variant="ghost" size="icon" className="self-start mb-6" onClick={onBack}>
            <ArrowLeft />
        </Button>
      
        <div className="flex items-start gap-4 mb-4">
            <Image src="https://placehold.co/80x80.png" alt="Phone icon" data-ai-hint="phone illustration" width={80} height={80} className="rounded-lg"/>
            <div>
                <h2 className="text-2xl font-bold">Enter your phone number</h2>
                <p className="text-muted-foreground mt-1">
                    Payment info, ride details and important updates will be sent to this number.
                </p>
            </div>
        </div>
      
        <div className="relative mt-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 border-r">
                <Image src="https://placehold.co/24x18.png" alt="India flag" data-ai-hint="india flag" width={24} height={18} />
                <span className="ml-2 text-sm">+91</span>
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength={10}
              className="pl-24 h-12 text-base"
            />
        </div>

        <a href="#" className="text-sm text-primary mt-4 self-start">Changed your number? Find your account</a>
      
      <div className="mt-8">
        <Button onClick={handleContinue} disabled={localPhone.length !== 10} className="w-full bg-accent hover:bg-accent/90 h-12 text-base font-semibold">Continue</Button>
      </div>
    </div>
  );
}
