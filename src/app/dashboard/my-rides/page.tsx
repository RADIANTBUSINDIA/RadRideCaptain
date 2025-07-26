
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Car, MapPin, Wallet, Star, XCircle, CheckCircle } from "lucide-react";
import { useTripContext } from "@/context/trip-context";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const RideStatusIcon = ({ status }: { status: 'completed' | 'rejected' | 'in-progress' }) => {
    switch (status) {
        case 'completed':
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'rejected':
            return <XCircle className="w-5 h-5 text-red-500" />;
        default:
            return <Car className="w-5 h-5 text-gray-500" />;
    }
};

export default function MyRidesPage() {
    const { tripHistory } = useTripContext();

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                My Rides
            </CardTitle>
            <CardDescription>
                View your past and upcoming ride history.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {tripHistory.length > 0 ? (
                <div className="space-y-4">
                    {tripHistory.map((trip) => (
                        <Card key={trip.id} className="p-4">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{format(new Date(trip.timestamp), "MMM d, yyyy 'at' h:mm a")}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                                <MapPin className="w-4 h-4 text-green-500"/>
                                                <span>{trip.pickupLocation.split(',')[0]}</span>
                                                <span>→</span>
                                                <MapPin className="w-4 h-4 text-red-500"/>
                                                <span>{trip.destination.split(',')[0]}</span>
                                            </div>
                                        </div>
                                        <Badge variant={trip.status === 'completed' ? 'default' : 'destructive'} className="capitalize flex items-center gap-1">
                                            <RideStatusIcon status={trip.status} />
                                            {trip.status}
                                         </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-right md:border-l md:pl-4">
                                    {trip.status === 'completed' ? (
                                        <>
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="font-bold text-lg">₹{trip.finalFare.toFixed(2)}</span>
                                                <Wallet className="w-5 h-5 text-primary"/>
                                            </div>
                                            <div className="flex items-center justify-end gap-2 text-muted-foreground">
                                                <span>{trip.tip > 0 ? `Includes ₹${trip.tip.toFixed(2)} tip` : 'No tip'}</span>
                                            </div>
                                            <div className="flex items-center justify-end gap-1 pt-1">
                                                <span className="text-muted-foreground">Rated:</span>
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400"/>
                                                <span className="font-medium">4</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-end h-full text-muted-foreground">
                                           <p>No ride details</p>
                                        </div>
                                    )}
                                </div>
                           </div>
                        </Card>
                    ))}
                </div>
            ) : (
                 <div className="text-center text-muted-foreground py-12">
                    <p>No ride history available yet.</p>
                    <p className="text-sm">Completed rides will appear here.</p>
                </div>
            )}
        </CardContent>
    </Card>
  );
}
