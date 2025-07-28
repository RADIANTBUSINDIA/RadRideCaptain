
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Car, Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import type { Driver } from "@/lib/types";


const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | null | undefined }) => (
    <div className="flex items-start gap-4 py-3 border-b last:border-b-0">
        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
        <div className="flex-1">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium">{value || 'N/A'}</p>
        </div>
    </div>
);

export default function DriverProfile() {
    const [profile, setProfile] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let driverId: string | null = null;
        try {
            const storedProfile = localStorage.getItem("driverProfile");
            if (storedProfile) {
                driverId = JSON.parse(storedProfile).id;
            }
        } catch (error) {
            console.error("Failed to parse driver ID from localStorage", error);
            setLoading(false);
            return;
        }

        if (!driverId) {
            setLoading(false);
            return;
        }

        const driverRef = ref(database, 'drivers/' + driverId);
        
        const unsubscribe = onValue(driverRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setProfile(data);
            } else {
                setProfile(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Firebase read failed: ", error);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4 p-1">
                 <Card>
                    <CardHeader className="p-4">
                        <Skeleton className="h-5 w-1/3" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="p-4">
                         <Skeleton className="h-5 w-1/3" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center text-muted-foreground py-10">
                <p>Could not load profile data.</p>
                <p className="text-sm">Please try again later or contact support.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="p-4">
                    <CardTitle className="flex items-center text-base">
                        <User className="w-4 h-4 mr-2 text-primary"/>
                        Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <InfoItem icon={User} label="Full Name" value={profile.profile.name} />
                    <InfoItem icon={Mail} label="Email" value={profile.profile.email} />
                    <InfoItem icon={Phone} label="Phone Number" value={profile.profile.phone} />
                    <InfoItem icon={Home} label="Address" value={profile.profile.address?.street} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="p-4">
                    <CardTitle className="flex items-center text-base">
                        <Car className="w-4 h-4 mr-2 text-primary"/>
                        Vehicle Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <InfoItem icon={Car} label="Vehicle Type" value={profile.licensing?.vehicle?.type} />
                    <InfoItem icon={Car} label="Model" value={profile.licensing?.vehicle?.model} />
                    <InfoItem icon={Car} label="Color" value={"Not specified"} />
                    <InfoItem icon={Car} label="Registration No." value={profile.licensing?.vehicle?.plateNumber} />
                </CardContent>
            </Card>
        </div>
    );
}
