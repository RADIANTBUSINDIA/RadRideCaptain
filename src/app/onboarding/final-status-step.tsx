
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, LoaderCircle, AlertTriangle } from "lucide-react";
import { submitOnboarding } from "@/app/onboarding/actions";
import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

interface FinalStatusStepProps {
    formData: any;
    isLoginFlow: boolean;
}

export default function FinalStatusStep({ formData, isLoginFlow }: FinalStatusStepProps) {
  const [status, setStatus] = useState("pending"); // pending, approved, error
  const router = useRouter();

  useEffect(() => {
    const processSubmission = async () => {
        try {
            const driverId = formData.phone;
            if (!driverId) {
                throw new Error("Phone number is missing, cannot proceed.");
            }
            
            let result: { success: boolean; driverId?: string; error?: string };

            if (isLoginFlow) {
                // This is a login flow. Fetch existing data to populate localStorage.
                setStatus("approved"); // Skip to approved for login
                const driverRef = ref(database, 'drivers/' + driverId);
                const snapshot = await get(driverRef);
                if (snapshot.exists()) {
                    const dbData = snapshot.val();
                    const driverProfile = {
                        id: driverId,
                        name: dbData.profile.name,
                        email: dbData.profile.email,
                        phone: dbData.profile.phone,
                    };
                    localStorage.setItem("driverProfile", JSON.stringify(driverProfile));
                    setTimeout(() => router.push("/dashboard"), 2000);
                } else {
                     throw new Error("Tried to log in, but no record found for this user.");
                }

            } else {
                // This is a new registration flow.
                // Simulate a 4-second review period
                await new Promise(resolve => setTimeout(resolve, 4000));

                // Call the server action to submit data
                result = await submitOnboarding(formData, driverId);

                 if (result.success && result.driverId) {
                    const driverProfile = {
                        id: result.driverId,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                    }
                    localStorage.setItem("driverProfile", JSON.stringify(driverProfile));
                    setStatus("approved");
                    setTimeout(() => router.push("/dashboard"), 5000); 
                } else {
                    console.error("Submission error:", result.error);
                    setStatus("error");
                }
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            setStatus("error");
        }
    };

    processSubmission();
  }, [formData, router, isLoginFlow]);

  const renderLoginContent = () => (
     <>
        <h2 className="text-2xl font-bold mb-2">Login Successful!</h2>
        <p className="text-muted-foreground mb-4">
            Welcome back! We're glad to see you again.
        </p>
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 my-6 flex items-center justify-center space-x-3">
            <CheckCircle className="w-5 h-5" />
            <p className="font-semibold">Redirecting to your dashboard...</p>
        </div>
     </>
  );

  const renderRegisterContent = () => {
       switch (status) {
        case "pending":
            return (
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
            );
        case "approved":
            return (
                 <>
                    <h2 className="text-2xl font-bold mb-2">Profile Approved!</h2>
                    <p className="text-muted-foreground mb-4">
                        Welcome to Rad RideCaptain! You are all set to start driving.
                    </p>
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 my-6 flex items-center justify-center space-x-3">
                        <CheckCircle className="w-5 h-5" />
                        <p className="font-semibold">Redirecting to your dashboard...</p>
                    </div>
                 </>
            );
        default: // error
             return (
                 <>
                    <h2 className="text-2xl font-bold mb-2">Submission Failed</h2>
                    <p className="text-muted-foreground mb-4">
                        We couldn't process your application at this time. Please try again later.
                    </p>
                     <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 my-6">
                        <p className="font-semibold">If the problem persists, please contact support.</p>
                    </div>
                 </>
            );
       }
  }


  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        {status === "pending" && !isLoginFlow && (
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
      { isLoginFlow ? renderLoginContent() : renderRegisterContent() }
    </div>
  );
}
