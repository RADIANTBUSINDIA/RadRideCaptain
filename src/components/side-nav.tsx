
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home,
  Car,
  BadgeDollarSign,
  Star,
  FileText,
  LifeBuoy,
  User,
  Settings,
  Gift,
  LogOut,
  ChevronDown,
  CarTaxiFront,
  Banknote,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import RadLogo from "./rad-logo";
import React, { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import type { Driver } from "@/lib/types";

const mainMenuItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "My Rides", href: "/dashboard/my-rides", icon: Car },
  { name: "Earnings", href: "/dashboard/earnings", icon: BadgeDollarSign },
  { name: "Ratings", href: "/dashboard/ratings", icon: Star },
  { name: "Promotions", href: "/dashboard/promotions", icon: Gift },
];

const profileMenuItems = [
    { name: "Personal", href: "/dashboard/profile/personal", icon: User },
    { name: "Vehicle", href: "/dashboard/profile/vehicle", icon: CarTaxiFront },
    { name: "Documents", href: "/dashboard/profile/documents", icon: FileText },
    { name: "Bank Details", href: "/dashboard/profile/bank", icon: Banknote },
    { name: "Security", href: "/dashboard/profile/security", icon: Lock },
];

const supportMenuItems = [
  { name: "Settings", href: "/dashboard/profile/settings", icon: Settings },
  { name: "Help Center", href: "/dashboard/support/help-center", icon: LifeBuoy },
];

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = React.useState(pathname.includes("/profile"));
  const [driverProfile, setDriverProfile] = useState<Partial<Driver> | null>(null);

  useEffect(() => {
    let driverId: string | null = null;
    try {
        const storedProfile = localStorage.getItem("driverProfile");
        if (storedProfile) {
            driverId = JSON.parse(storedProfile).id;
        }
    } catch (error) {
        console.error("Failed to parse driver ID from localStorage", error);
        return;
    }

    if (!driverId) {
        return;
    }
    
    const driverRef = ref(database, 'drivers/' + driverId);
    
    const unsubscribe = onValue(driverRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setDriverProfile(data);
        } else {
            setDriverProfile(null);
        }
    }, (error) => {
        console.error("Firebase read failed: ", error);
    });

    return () => unsubscribe();
  }, [])

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  
  const getInitials = (name: string) => {
    if (!name) return "JD";
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
    return name.charAt(0);
  }

  return (
    <div className="flex h-full max-h-screen flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
            <Avatar className="h-12 w-12">
                <AvatarImage src={driverProfile?.profile?.profilePic || "https://placehold.co/100x100.png"} data-ai-hint="driver avatar" alt="Driver" />
                <AvatarFallback>{getInitials(driverProfile?.profile?.name || "John Doe")}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-lg">{driverProfile?.profile?.name || "John Doe"}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{driverProfile?.metrics?.rating?.toFixed(1) || '4.9'}</span>
                </div>
            </div>
        </div>

       <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start p-4 text-base font-medium">
                {mainMenuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                        pathname === item.href && "text-primary bg-muted"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}

                 <Collapsible open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </div>
                        <ChevronDown className={cn("h-5 w-5 transition-transform", isProfileOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-8 space-y-1 py-2">
                        {profileMenuItems.map((item) => (
                             <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                                pathname.startsWith(item.href) && "text-primary bg-muted font-semibold"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                {supportMenuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                        pathname === item.href && "text-primary bg-muted"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>

        <div className="mt-auto p-4 border-t">
             <Button size="sm" variant="ghost" className="w-full justify-start gap-3 text-base py-6" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                Logout
            </Button>
        </div>
    </div>
  );
}
