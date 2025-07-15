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

export default function DocumentUploadStep({ onNext, onBack, updateFormData }: DocumentUploadStepProps) {
  const [files, setFiles] = useState({
      licenseFile: null,
      aadharFile: null,
      policeVerificationFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (inputFiles) {
        setFiles(prev => ({...prev, [name]: inputFiles[0]}));
        updateFormData({ [name]: inputFiles[0] });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
      <p className="text-muted-foreground mb-6">Please upload the required documents for verification.</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="licenseFile">Driving License</Label>
            <Input id="licenseFile" name="licenseFile" type="file" className="hidden" onChange={handleChange} />
            <Label htmlFor="licenseFile" className="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-5 h-5 mr-2" />
                <span>{files.licenseFile ? (files.licenseFile as any).name : 'Upload Driving License'}</span>
            </Label>
        </div>
         <div className="space-y-2">
            <Label htmlFor="aadharFile">Aadhar Card / PAN Card</Label>
            <Input id="aadharFile" name="aadharFile" type="file" className="hidden" onChange={handleChange} />
            <Label htmlFor="aadharFile" className="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-5 h-5 mr-2" />
                <span>{files.aadharFile ? (files.aadharFile as any).name : 'Upload Aadhar or PAN'}</span>
            </Label>
        </div>
         <div className="space-y-2">
            <Label htmlFor="policeVerificationFile">Police Verification Certificate</Label>
            <Input id="policeVerificationFile" name="policeVerificationFile" type="file" className="hidden" onChange={handleChange} />
            <Label htmlFor="policeVerificationFile" className="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-5 h-5 mr-2" />
                <span>{files.policeVerificationFile ? (files.policeVerificationFile as any).name : 'Upload Police Verification'}</span>
            </Label>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} className="bg-accent hover:bg-accent/90">Review & Submit</Button>
      </div>
    </div>
  );
}
