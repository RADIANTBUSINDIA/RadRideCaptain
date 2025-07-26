
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Car } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DriverProfileData {
    name: string;
    email: string;
    phone: string;
    vehicleType: string;
    vehicleModel: string;
    vehicleColor: string;
    vehicleNumber: string;
}

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | null }) => (
    <div className="flex items-center gap-4 py-3 border-b last:border-b-0">
        <Icon className="w-5 h-5 text-primary" />
        <div className="flex-1">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium">{value || 'N/A'}</p>
        </div>
    </div>
);

export default function DriverProfile() {
    const [profile, setProfile] = useState<DriverProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedProfile = localStorage.getItem("driverProfile");
            if (storedProfile) {
                setProfile(JSON.parse(storedProfile));
            }
        } catch (error) {
            console.error("Failed to parse driver profile from localStorage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="space-y-4 p-1">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center text-muted-foreground py-10">
                <p>No profile data found.</p>
                <p className="text-sm">Please complete the onboarding process.</p>
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
                    <InfoItem icon={User} label="Full Name" value={profile.name} />
                    <InfoItem icon={Mail} label="Email" value={profile.email} />
                    <InfoItem icon={Phone} label="Phone Number" value={profile.phone} />
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
                    <InfoItem icon={Car} label="Vehicle Type" value={profile.vehicleType} />
                    <InfoItem icon={Car} label="Model" value={profile.vehicleModel} />
                    <InfoItem icon={Car} label="Color" value={profile.vehicleColor} />
                    <InfoItem icon={Car} label="Registration No." value={profile.vehicleNumber} />
                </CardContent>
            </Card>
        </div>
    );
}
