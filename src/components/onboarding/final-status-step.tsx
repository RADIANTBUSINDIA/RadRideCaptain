
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, LoaderCircle, AlertTriangle } from "lucide-react";
import { submitOnboarding } from "@/app/onboarding/actions";

interface FinalStatusStepProps {
    formData: any;
}

export default function FinalStatusStep({ formData }: FinalStatusStepProps) {
  const [status, setStatus] = useState("pending"); // pending, approved, error
  const router = useRouter();

  useEffect(() => {
    const processSubmission = async () => {
        try {
            // Simulate a 4-second review period
            await new Promise(resolve => setTimeout(resolve, 4000));

            // Call the server action to submit data
            const result = await submitOnboarding(formData);

            if (result.success) {
                // On successful submission, cache profile data to localStorage
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

                setStatus("approved");
                
                // Wait a bit after showing approved status then redirect
                setTimeout(() => {
                    router.push("/dashboard");
                }, 5000); 

            } else {
                console.error("Submission error:", result.error);
                setStatus("error");
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            setStatus("error");
        }
    };

    processSubmission();
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
        {status === "error" && (
           <div className="p-4 bg-red-100 rounded-full">
             <AlertTriangle className="w-12 h-12 text-red-600" />
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
                Welcome to RadCaptian! You are all set to start driving.
            </p>
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 my-6 flex items-center justify-center space-x-3">
                <CheckCircle className="w-5 h-5" />
                <p className="font-semibold">Redirecting to your dashboard...</p>
            </div>
         </>
      )}

       {status === "error" && (
         <>
            <h2 className="text-2xl font-bold mb-2">Submission Failed</h2>
            <p className="text-muted-foreground mb-4">
                We couldn't process your application at this time. Please try again later.
            </p>
             <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 my-6">
                <p className="font-semibold">If the problem persists, please contact support.</p>
            </div>
         </>
      )}
    </div>
  );
}
