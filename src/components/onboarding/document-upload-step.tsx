
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload"; // Changed import

interface DocumentUploadStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: any) => void;
}

export default function DocumentUploadStep({ onNext, onBack, updateFormData }: DocumentUploadStepProps) {
    
  const handleFileChange = (name: string, file: File | null) => {
    updateFormData({ [name]: file });
  };

  // All fields are optional, so the button should always be enabled.
  const isFormValid = () => {
    return true;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
      <p className="text-muted-foreground mb-6">Please upload the required documents for verification.</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload name="rcFile" label="Registration Certificate (RC)" onFileChange={handleFileChange} isOptional />
            <ImageUpload name="licenseFile" label="Driver's License" onFileChange={handleFileChange} isOptional />
            <ImageUpload name="insuranceFile" label="Vehicle Insurance" onFileChange={handleFileChange} isOptional />
            <ImageUpload name="fitnessCertificateFile" label="Vehicle Fitness Certificate" onFileChange={handleFileChange} isOptional />
            <ImageUpload name="vehiclePhotoFile" label="Vehicle Photo" onFileChange={handleFileChange} isOptional />
            <ImageUpload name="userPhotoFile" label="Your Photo" onFileChange={handleFileChange} isOptional />
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!isFormValid()} className="bg-accent hover:bg-accent/90">Review & Submit</Button>
      </div>
    </div>
  );
}
