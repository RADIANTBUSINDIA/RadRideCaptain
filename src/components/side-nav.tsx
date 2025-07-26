
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import RadLogo from "./rad-logo";

const menuItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "My Rides", href: "/dashboard/my-rides", icon: Car },
  { name: "Earnings", href: "/dashboard/earnings", icon: BadgeDollarSign },
  { name: "Ratings", href: "/dashboard/ratings", icon: Star },
  { name: "Promotions", href: "/dashboard/promotions", icon: Gift },
  { name: "Documents", href: "/dashboard/profile/documents", icon: FileText },
  { name: "Profile", href: "/dashboard/profile/personal", icon: User },
  { name: "Settings", href: "/dashboard/profile/settings", icon: Settings },
  { name: "Support", href: "/dashboard/support/help-center", icon: LifeBuoy },
];

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage and redirect to home
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="flex h-full max-h-screen flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
            <Avatar className="h-12 w-12">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="driver avatar" alt="Driver" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-lg">John Doe</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>4.9</span>
                </div>
            </div>
        </div>

       <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start p-4 text-base font-medium">
            {menuItems.map((item) => (
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
                )
            )}
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
