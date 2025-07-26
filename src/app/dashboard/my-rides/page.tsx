
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Car, MapPin, Wallet, Star, XCircle, CheckCircle, Calendar, IndianRupee } from "lucide-react";
import { useTripContext } from "@/context/trip-context";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

const InfoItem = ({ icon: Icon, label, value, valueClassName }: { icon: React.ElementType, label: string, value: React.ReactNode, valueClassName?: string }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-muted-foreground">
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
        </div>
        <span className={`text-sm font-medium ${valueClassName || ''}`}>{value}</span>
    </div>
);


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
                           <div className="flex flex-col space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-base">{trip.customerName}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{format(new Date(trip.timestamp), "MMM d, yyyy 'at' h:mm a")}</span>
                                        </div>
                                    </div>
                                    <Badge variant={trip.status === 'completed' ? 'default' : 'destructive'} className="capitalize flex items-center gap-1">
                                        <RideStatusIcon status={trip.status} />
                                        {trip.status}
                                    </Badge>
                                </div>
                                
                                <Separator />

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-muted-foreground text-xs">PICKUP</p>
                                            <p>{trip.pickupLocation}</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-muted-foreground text-xs">DROP-OFF</p>
                                            <p>{trip.destination}</p>
                                        </div>
                                    </div>
                                </div>
                               
                                {trip.status === 'completed' && (
                                    <>
                                        <Separator />
                                        <div className="space-y-3">
                                            <InfoItem icon={Wallet} label="Payment Method" value="Cash" />
                                            <InfoItem icon={IndianRupee} label="Ride Fare" value={`₹${trip.finalFare.toFixed(2)}`} />
                                            <InfoItem icon={IndianRupee} label="Tip" value={`₹${trip.tip.toFixed(2)}`} />
                                            <Separator />
                                            <InfoItem icon={IndianRupee} label="Total Earning" value={`₹${(trip.finalFare + trip.tip).toFixed(2)}`} valueClassName="font-bold text-base text-primary" />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between pt-1">
                                            <p className="text-sm text-muted-foreground">Your Rating</p>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-5 h-5 text-amber-400 fill-amber-400"/>
                                                <span className="font-bold text-base">4</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {trip.status === 'rejected' && (
                                     <div className="text-center text-muted-foreground py-4">
                                        <p>This ride was not accepted.</p>
                                     </div>
                                )}
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
