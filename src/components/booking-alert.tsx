
"use client";

import type { BookingRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { User, MapPin, ArrowRight } from "lucide-react";

interface BookingAlertProps {
  bookingRequest: BookingRequest;
  onAccept: () => void;
  onDecline: () => void;
}

export default function BookingAlert({
  bookingRequest,
  onAccept,
  onDecline,
}: BookingAlertProps) {
  return (
    <Dialog open={!!bookingRequest} onOpenChange={(isOpen) => !isOpen && onDecline()}>
      <DialogContent className="sm:max-w-md border-accent border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            New Booking Request!
          </DialogTitle>
          <DialogDescription className="text-center">
            A new ride is available. Please respond quickly.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-4">
            <User className="w-5 h-5 text-primary" />
            <span className="font-medium">Customer:</span>
            <span>{bookingRequest.customerName}</span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-green-500 mt-1" />
            <div className="flex-1">
              <span className="font-medium">From:</span>
              <p>{bookingRequest.pickupLocation.name}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-red-500 mt-1" />
            <div className="flex-1">
              <span className="font-medium">To:</span>
              <p>{bookingRequest.destination.name}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button onClick={onAccept} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Accept Ride
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
