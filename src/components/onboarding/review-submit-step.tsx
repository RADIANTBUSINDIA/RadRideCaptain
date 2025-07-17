
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, File, User, Car } from "lucide-react";

interface ReviewSubmitStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: any;
}

const InfoItem = ({ label, value }: { label: string, value: string | null }) => (
    <div className="flex justify-between py-2 border-b">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value || 'Not provided'}</p>
    </div>
);

const FileItem = ({ label, file, isOptional = false }: { label: string, file: File | null, isOptional?: boolean }) => (
     <div className="flex justify-between py-2 border-b items-center">
        <p className="text-sm text-muted-foreground">{label} {isOptional && <span className="text-xs">(Optional)</span>}</p>
        {file ? (
            <span className="flex items-center text-sm font-medium text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                {file.name}
            </span>
        ) : (
             <p className="text-sm text-muted-foreground">Not uploaded</p>
        )}
    </div>
)


export default function ReviewSubmitStep({ onNext, onBack, formData }: ReviewSubmitStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
      <p className="text-muted-foreground mb-6">Please review all your information before submitting.</p>
      
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><User className="w-5 h-5 mr-3 text-primary"/>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
                <InfoItem label="Full Name" value={formData.name} />
                <InfoItem label="Email" value={formData.email} />
                <InfoItem label="Phone Number" value={formData.phone} />
                <InfoItem label="Gender" value={formData.gender} />
                <InfoItem label="Address" value={formData.address} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><Car className="w-5 h-5 mr-3 text-primary"/>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent>
                <InfoItem label="Vehicle Type" value={formData.vehicleType} />
                <InfoItem label="Model" value={formData.vehicleModel} />
                <InfoItem label="Color" value={formData.vehicleColor} />
                <InfoItem label="Registration Number" value={formData.vehicleNumber} />
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><File className="w-5 h-5 mr-3 text-primary"/>Documents</CardTitle>
            </CardHeader>
            <CardContent>
                <FileItem label="RC Card" file={formData.rcFile} isOptional />
                <FileItem label="Driving License" file={formData.licenseFile} isOptional />
                <FileItem label="Insurance" file={formData.insuranceFile} isOptional />
                <FileItem label="Fitness Certificate" file={formData.fitnessCertificateFile} isOptional />
                <FileItem label="Vehicle Photo" file={formData.vehiclePhotoFile} isOptional />
                <FileItem label="Your Photo" file={formData.userPhotoFile} isOptional />
            </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} className="bg-accent hover:bg-accent/90">Confirm & Submit</Button>
      </div>
    </div>
  );
}
