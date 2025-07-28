
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
import { User, MapPin, ArrowRight, Wallet, Clock, Route, Star, CreditCard, Car, Timer } from "lucide-react";
import { Separator } from "./ui/separator";

interface BookingAlertProps {
  bookingRequest: BookingRequest;
  timeToPickup: number; // in minutes
  onAccept: () => void;
  onDecline: () => void;
}

export default function BookingAlert({
  bookingRequest,
  timeToPickup,
  onAccept,
  onDecline,
}: BookingAlertProps) {
  return (
    <Dialog open={!!bookingRequest} onOpenChange={(isOpen) => !isOpen && onDecline()}>
      <DialogContent className="sm:max-w-lg border-accent border-2 p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center">
            New Booking Request!
          </DialogTitle>
          <DialogDescription className="text-center">
            A new ride is available. Please respond quickly.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 px-6">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-bold">{bookingRequest.customerName}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400"/>
                            <span>{bookingRequest.riderRating}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                     <p className="font-bold text-lg text-primary">₹{bookingRequest.fareEstimate.toFixed(2)}</p>
                     <p className="text-xs text-muted-foreground">Est. Earning</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">Pickup Time</p>
                  <p className="font-bold text-sm">{timeToPickup} min</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">Trip Duration</p>
                  <p className="font-bold text-sm">{bookingRequest.estimatedTime} min</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">Distance</p>
                  <p className="font-bold text-sm">{bookingRequest.distance} km</p>
              </div>
            </div>

          <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                    <p className="text-muted-foreground text-xs">PICKUP</p>
                    <p className="text-sm font-medium">{bookingRequest.pickupLocation.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                 <div>
                    <p className="text-muted-foreground text-xs">DROP-OFF</p>
                    <p className="text-sm font-medium">{bookingRequest.destination.address}</p>
                </div>
              </div>
          </div>
            <Separator />
           <div className="flex justify-around text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="w-4 h-4 text-primary"/>
                    <span>{bookingRequest.paymentMode}</span>
                </div>
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <Car className="w-4 h-4 text-primary"/>
                    <span>{bookingRequest.rideType}</span>
                </div>
           </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-0">
          <Button variant="ghost" size="lg" className="rounded-none rounded-bl-lg" onClick={onDecline}>
            Decline
          </Button>
          <Button size="lg" onClick={onAccept} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-none rounded-br-lg flex items-center gap-2">
            Accept Ride 
            <div className="flex items-center gap-1 bg-black/20 text-white rounded-full px-2 py-0.5 text-xs">
                <Timer className="w-3 h-3"/>
                <span>{bookingRequest.countdown}s</span>
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
