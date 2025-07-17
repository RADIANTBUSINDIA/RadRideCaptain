
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VehicleInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: any) => void;
  formData: any;
}

export default function VehicleInfoStep({ onNext, onBack, updateFormData, formData }: VehicleInfoStepProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    updateFormData({ [name]: value });
  };

  const isFormValid = () => {
    return (
        formData.vehicleType.trim() !== "" &&
        formData.vehicleModel.trim() !== "" &&
        formData.vehicleColor.trim() !== "" &&
        formData.vehicleNumber.trim() !== ""
    );
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Vehicle Information</h2>
      <p className="text-muted-foreground mb-6">Provide details about your car.</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select name="vehicleType" value={formData.vehicleType} onValueChange={(value) => handleSelectChange('vehicleType', value)}>
                    <SelectTrigger id="vehicleType">
                        <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="vehicleModel">Model</Label>
                <Input id="vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g. Honda City" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="vehicleColor">Color</Label>
                <Input id="vehicleColor" name="vehicleColor" value={formData.vehicleColor} onChange={handleChange} placeholder="e.g. White" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Registration Number</Label>
                <Input id="vehicleNumber" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="e.g. KA 01 AB 1234" />
            </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!isFormValid()} className="bg-accent hover:bg-accent/90">Next Step</Button>
      </div>
    </div>
  );
}
