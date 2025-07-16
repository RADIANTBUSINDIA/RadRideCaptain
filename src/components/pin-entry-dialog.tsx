
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pin } from "lucide-react";

interface PinEntryDialogProps {
  isOpen: boolean;
  onPinVerified: () => void;
  onClose: () => void;
}

export default function PinEntryDialog({
  isOpen,
  onPinVerified,
  onClose,
}: PinEntryDialogProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset pin when dialog opens/closes
    setPin("");
    setError(false);
  }, [isOpen]);

  const handleVerify = () => {
    // For testing, accept any 4-digit pin.
    if (pin.length === 4) {
      setError(false);
      onPinVerified();
    } else {
      setError(true);
      toast({
        variant: "destructive",
        title: "Invalid PIN",
        description: "The PIN must be 4 digits long. Please try again.",
      });
      setPin("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    if (error) setError(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pin className="h-5 w-5 text-primary" />
            Enter Rider PIN
          </DialogTitle>
          <DialogDescription>
            Ask the rider for the 4-digit PIN to start the trip.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={pin}
            onChange={handleInputChange}
            maxLength={4}
            placeholder="----"
            className={`h-16 text-center text-4xl tracking-[1em] font-mono ${
              error ? "border-destructive focus-visible:ring-destructive" : ""
            }`}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleVerify} disabled={pin.length !== 4}>
            Start Trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
