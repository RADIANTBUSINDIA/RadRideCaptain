
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface DocumentUploadStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: any) => void;
}

const FileUploadField = ({ id, name, label, file, onChange, isOptional = false }: { id: string, name: string, label: string, file: File | null, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, isOptional?: boolean }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label} {isOptional && <span className="text-xs text-muted-foreground">(Optional)</span>}</Label>
        <Input id={id} name={name} type="file" className="hidden" onChange={onChange} />
        <Label htmlFor={id} className="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload className="w-5 h-5 mr-2" />
            <span>{file ? file.name : `Upload ${label}`}</span>
        </Label>
    </div>
);


export default function DocumentUploadStep({ onNext, onBack, updateFormData }: DocumentUploadStepProps) {
  const [files, setFiles] = useState({
      rcFile: null,
      licenseFile: null,
      insuranceFile: null,
      fitnessCertificateFile: null,
      vehiclePhotoFile: null,
      userPhotoFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (inputFiles && inputFiles.length > 0) {
        const file = inputFiles[0];
        setFiles(prev => ({...prev, [name]: file as any}));
        updateFormData({ [name]: file });
    }
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
            <FileUploadField id="rcFile" name="rcFile" label="Registration Certificate (RC)" file={files.rcFile} onChange={handleChange} isOptional />
            <FileUploadField id="licenseFile" name="licenseFile" label="Driver's License" file={files.licenseFile} onChange={handleChange} isOptional />
            <FileUploadField id="insuranceFile" name="insuranceFile" label="Vehicle Insurance" file={files.insuranceFile} onChange={handleChange} isOptional />
            <FileUploadField id="fitnessCertificateFile" name="fitnessCertificateFile" label="Vehicle Fitness Certificate" file={files.fitnessCertificateFile} onChange={handleChange} isOptional />
            <FileUploadField id="vehiclePhotoFile" name="vehiclePhotoFile" label="Vehicle Photo" file={files.vehiclePhotoFile} onChange={handleChange} isOptional />
            <FileUploadField id="userPhotoFile" name="userPhotoFile" label="Your Photo" file={files.userPhotoFile} onChange={handleChange} isOptional />
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!isFormValid()} className="bg-accent hover:bg-accent/90">Review & Submit</Button>
      </div>
    </div>
  );
}
