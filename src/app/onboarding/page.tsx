
"use client";

import { useState } from "react";
import WelcomeStep from "@/components/onboarding/welcome-step";
import PhoneEntryStep from "@/components/onboarding/phone-entry-step";
import OtpVerificationStep from "@/components/onboarding/otp-verification-step";
import BasicInfoStep from "@/components/onboarding/basic-info-step";
import VehicleInfoStep from "@/components/onboarding/vehicle-info-step";
import DocumentUploadStep from "@/components/onboarding/document-upload-step";
import ReviewSubmitStep from "@/components/onboarding/review-submit-step";
import FinalStatusStep from "@/app/onboarding/final-status-step";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isExistingUser, setIsExistingUser] = useState(false);
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
    insuranceFile: null,
    fitnessCertificateFile: null,
    vehiclePhotoFile: null,
    userPhotoFile: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  
  const handleExistingUserCheck = (exists: boolean) => {
    setIsExistingUser(exists);
    nextStep();
  }

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const registrationSteps = 7;
  const loginSteps = 3;
  const totalSteps = isExistingUser ? loginSteps : registrationSteps;
  const currentStepNumber = isExistingUser && step > 2 ? step - 1 : step;
  const progressValue = (currentStepNumber / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <PhoneEntryStep
            onNext={handleExistingUserCheck}
            onBack={prevStep}
            updateFormData={updateFormData}
            phone={formData.phone}
          />
        );
      case 3:
        return (
          <OtpVerificationStep
            onNext={isExistingUser ? () => setStep(8) : nextStep} // Skip to final step if existing user
            onBack={prevStep}
            updateFormData={updateFormData}
            phone={formData.phone}
          />
        );
      case 4:
        return (
          <BasicInfoStep
            onNext={nextStep}
            onBack={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        );
      case 5:
        return (
          <VehicleInfoStep
            onNext={nextStep}
            onBack={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        );
      case 6:
        return (
          <DocumentUploadStep
            onNext={nextStep}
            onBack={prevStep}
            updateFormData={updateFormData}
          />
        );
      case 7:
        return (
          <ReviewSubmitStep
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
          />
        );
      case 8:
        return <FinalStatusStep formData={formData} isLoginFlow={isExistingUser} />;
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
        {step < 8 && step > 1 && (
          <div className="mb-8">
             <h2 className="text-center text-sm font-semibold text-primary mb-2">
                {isExistingUser ? `Login: Step ${currentStepNumber-1} of ${totalSteps-1}` : `Registration: Step ${currentStepNumber} of ${totalSteps}`}
            </h2>
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
