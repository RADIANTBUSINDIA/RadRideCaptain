"use client";

import { useState } from "react";
import WelcomeStep from "@/components/onboarding/welcome-step";
import PhoneVerificationStep from "@/components/onboarding/phone-verification-step";
import BasicInfoStep from "@/components/onboarding/basic-info-step";
import VehicleInfoStep from "@/components/onboarding/vehicle-info-step";
import DocumentUploadStep from "@/components/onboarding/document-upload-step";
import ReviewSubmitStep from "@/components/onboarding/review-submit-step";
import FinalStatusStep from "@/components/onboarding/final-status-step";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "Driver", // Default to Driver
    phone: "",
    otp: "",
    name: "",
    email: "",
    gender: "",
    address: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleColor: "",
    vehicleNumber: "",
    rcFile: null,
    licenseFile: null,
    aadharFile: null,
    policeVerificationFile: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const totalSteps = 7;
  const progressValue = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <PhoneVerificationStep
            onNext={nextStep}
            onBack={prevStep}
            updateFormData={updateFormData}
            phone={formData.phone}
          />
        );
      case 3:
        return (
          <BasicInfoStep
            onNext={nextStep}
            onBack={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        );
      case 4:
        return (
          <VehicleInfoStep
            onNext={nextStep}
            onBack={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        );
      case 5:
        return (
          <DocumentUploadStep
            onNext={nextStep}
            onBack={prevStep}
            updateFormData={updateFormData}
          />
        );
      case 6:
        return (
          <ReviewSubmitStep
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
          />
        );
      case 7:
        return <FinalStatusStep formData={formData} />;
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  if (step === 1) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <WelcomeStep onNext={nextStep} />
        </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        {step < totalSteps && (
          <div className="mb-8">
            <h2 className="text-center text-sm font-semibold text-primary mb-2">Step {step} of {totalSteps -1}</h2>
            <Progress value={progressValue} className="w-full" />
          </div>
        )}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            {renderStep()}
        </div>
      </div>
    </div>
  );
}
