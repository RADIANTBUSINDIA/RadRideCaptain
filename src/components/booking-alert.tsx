
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
import { User, MapPin, ArrowRight, Wallet, Clock, Route } from "lucide-react";

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
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 rounded-lg bg-muted">
                  <Wallet className="mx-auto h-6 w-6 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Est. Fare</p>
                  <p className="font-bold">₹{bookingRequest.fareEstimate.toFixed(2)}</p>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                  <Clock className="mx-auto h-6 w-6 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Est. Time</p>
                  <p className="font-bold">{bookingRequest.estimatedTime} min</p>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                  <Route className="mx-auto h-6 w-6 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-bold">{bookingRequest.distance} km</p>
              </div>
            </div>

          <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-primary" />
                <span className="font-medium">Customer:</span>
                <span>{bookingRequest.customerName}</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-medium">From:</span>
                  <p className="text-sm">{bookingRequest.pickupLocation.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-medium">To:</span>
                  <p className="text-sm">{bookingRequest.destination.name}</p>
                </div>
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
