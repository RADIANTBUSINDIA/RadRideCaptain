
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { checkDriverExists } from "@/lib/firebase-utils";

interface PhoneEntryStepProps {
  onNext: (isExisting: boolean) => void;
  onBack: () => void;
  updateFormData: (data: { phone: string }) => void;
  phone: string;
}

export default function PhoneEntryStep({ onNext, onBack, updateFormData, phone }: PhoneEntryStepProps) {
  const [localPhone, setLocalPhone] = useState(phone);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    setIsLoading(true);
    setError("");
    updateFormData({ phone: localPhone });
    try {
        const exists = await checkDriverExists(localPhone);
        onNext(exists);
    } catch (err) {
        setError("Could not verify phone number. Please try again.");
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
        <Button variant="ghost" size="icon" className="self-start mb-6" onClick={onBack}>
            <ArrowLeft />
        </Button>
      
        <div className="flex items-start gap-4 mb-4">
            <Image src="https://placehold.co/80x80.png" data-ai-hint="phone illustration" alt="Phone icon" width={80} height={80} className="rounded-lg"/>
            <div>
                <h2 className="text-2xl font-bold">Enter your phone number</h2>
                <p className="text-muted-foreground mt-1">
                    We'll check if you have an account or help you create a new one.
                </p>
            </div>
        </div>
      
        <div className="relative mt-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 border-r">
                <Image src="https://placehold.co/24x18.png" data-ai-hint="india flag" alt="India flag" width={24} height={18} />
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
        
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      
        <div className="mt-8">
            <Button onClick={handleContinue} disabled={localPhone.length !== 10 || isLoading} className="w-full bg-accent hover:bg-accent/90 h-12 text-base font-semibold">
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Continue
            </Button>
      </div>
    </div>
  );
}
