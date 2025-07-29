
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, CarTaxiFront, FileText, Banknote, Lock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="grid md:grid-cols-4 gap-6 items-start">
        <div className="md:col-span-1">
             <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
                <Card>
                    <CollapsibleTrigger className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between p-4">
                            <CardTitle className="text-lg">Profile Settings</CardTitle>
                             <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                       <CardContent className="p-2 border-t">
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
                    </CollapsibleContent>
                </Card>
             </Collapsible>
        </div>
        <div className="md:col-span-3">
            {children}
        </div>
    </div>
  );
}
