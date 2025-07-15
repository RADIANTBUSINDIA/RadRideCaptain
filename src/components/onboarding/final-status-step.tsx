"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function FinalStatusStep() {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-green-100 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
      <p className="text-muted-foreground mb-4">
        Your profile and documents have been submitted for verification.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 my-6 flex items-center justify-center space-x-3">
        <Clock className="w-5 h-5" />
        <p className="font-semibold">Profile Pending Approval</p>
      </div>
      
      <p className="text-sm text-muted-foreground">
        You will be notified via email and SMS once your profile is approved. This usually takes 2-3 business days.
      </p>

       <div className="mt-8">
        <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
