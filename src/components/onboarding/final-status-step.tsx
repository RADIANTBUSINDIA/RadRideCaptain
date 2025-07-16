"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, LoaderCircle } from "lucide-react";
import Link from "next/link";

interface FinalStatusStepProps {
    formData: any;
}

export default function FinalStatusStep({ formData }: FinalStatusStepProps) {
  const [status, setStatus] = useState("pending"); // pending, approved
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Cache data to localStorage
      try {
        const driverProfile = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            vehicleType: formData.vehicleType,
            vehicleModel: formData.vehicleModel,
            vehicleColor: formData.vehicleColor,
            vehicleNumber: formData.vehicleNumber
        }
        localStorage.setItem("driverProfile", JSON.stringify(driverProfile));
      } catch (error) {
        console.error("Could not save driver profile to localStorage", error);
      }

      // 2. Update status and redirect
      setStatus("approved");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500); // Wait a bit after showing approved status
    }, 4000); // Simulate a 4-second review period

    return () => clearTimeout(timer);
  }, [formData, router]);

  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        {status === "pending" && (
            <div className="p-4 bg-blue-100 rounded-full">
                <Clock className="w-12 h-12 text-blue-600" />
            </div>
        )}
        {status === "approved" && (
           <div className="p-4 bg-green-100 rounded-full">
             <CheckCircle className="w-12 h-12 text-green-600" />
           </div>
        )}
      </div>

      {status === "pending" && (
        <>
            <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
            <p className="text-muted-foreground mb-4">
                Your profile and documents have been submitted for verification.
            </p>
            <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 my-6 flex items-center justify-center space-x-3">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                <p className="font-semibold">Your application is under review...</p>
            </div>
            <p className="text-sm text-muted-foreground">
                This usually takes a moment. Please wait.
            </p>
        </>
      )}

      {status === "approved" && (
         <>
            <h2 className="text-2xl font-bold mb-2">Profile Approved!</h2>
            <p className="text-muted-foreground mb-4">
                Welcome to Rad Captian! You are all set to start driving.
            </p>
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 my-6 flex items-center justify-center space-x-3">
                <CheckCircle className="w-5 h-5" />
                <p className="font-semibold">Redirecting to your dashboard...</p>
            </div>
         </>
      )}
    </div>
  );
}
