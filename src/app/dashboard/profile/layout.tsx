
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, CarTaxiFront, FileText, Banknote, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const profileNavItems = [
    { name: "Personal", href: "/dashboard/profile/personal", icon: User },
    { name: "Vehicle", href: "/dashboard/profile/vehicle", icon: CarTaxiFront },
    { name: "Documents", href: "/dashboard/profile/documents", icon: FileText },
    { name: "Bank Details", href: "/dashboard/profile/bank", icon: Banknote },
    { name: "Security", href: "/dashboard/profile/security", icon: Lock },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                     <nav className="grid items-start text-sm font-medium">
                        {profileNavItems.map((item) => (
                             <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                                pathname === item.href && "text-primary bg-muted font-semibold"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-3">
            {children}
        </div>
    </div>
  );
}
