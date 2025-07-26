
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Upload } from "lucide-react";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";

const documentTypes = [
  { id: "licenseFile", label: "Driver's License" },
  { id: "rcFile", label: "Registration Certificate (RC)" },
  { id: "insuranceFile", label: "Vehicle Insurance" },
  { id: "fitnessCertificateFile", label: "Vehicle Fitness Certificate" },
  { id: "vehiclePhotoFile", label: "Vehicle Photo" },
  { id: "userPhotoFile", label: "Your Photo" },
];

export default function DocumentsPage() {
    const [documentFiles, setDocumentFiles] = useState<Record<string, File | null>>({
        licenseFile: null,
        rcFile: null,
        insuranceFile: null,
        fitnessCertificateFile: null,
        vehiclePhotoFile: null,
        userPhotoFile: null,
    });

    const handleFileChange = (name: string, file: File | null) => {
        setDocumentFiles(prev => ({...prev, [name]: file}));
    }

    const handleSaveChanges = () => {
        // Here you would typically handle the upload to your server/backend
        console.log("Saving documents:", documentFiles);
        alert("Changes saved successfully! (Simulated)");
    };


  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Documents
            </CardTitle>
            <CardDescription>
                View and manage your uploaded documents. Upload new files to update them.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentTypes.map(doc => (
                    <ImageUpload 
                        key={doc.id}
                        name={doc.id}
                        label={doc.label}
                        onFileChange={handleFileChange}
                    />
                ))}
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button onClick={handleSaveChanges}>
                <Upload className="w-4 h-4 mr-2"/>
                Save Changes
            </Button>
        </CardFooter>
    </Card>
  );
}
