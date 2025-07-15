"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BasicInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: any) => void;
  formData: any;
}

export default function BasicInfoStep({ onNext, onBack, updateFormData, formData }: BasicInfoStepProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string, value: string }) => {
    if ('target' in e) {
      const { name, value } = e.target;
      updateFormData({ [name]: value });
    } else {
        const { name, value } = e;
        updateFormData({ [name]: value });
    }
  };

  const handleGenderChange = (value: string) => {
    updateFormData({ gender: value });
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
      <p className="text-muted-foreground mb-6">Tell us a little about yourself.</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Ramesh Kumar" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. ramesh@example.com"/>
          </div>
        </div>

        <div className="space-y-2">
           <Label>Gender</Label>
           <RadioGroup
             defaultValue={formData.gender}
             onValueChange={handleGenderChange}
             className="flex space-x-4 pt-2"
           >
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="male" id="male" />
               <Label htmlFor="male">Male</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="female" id="female" />
               <Label htmlFor="female">Female</Label>
             </div>
             <div className="flex items-center space-x-2">
               <RadioGroupItem value="other" id="other" />
               <Label htmlFor="other">Other</Label>
             </div>
           </RadioGroup>
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your complete residential address"/>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} className="bg-accent hover:bg-accent/90">Next Step</Button>
      </div>
    </div>
  );
}
