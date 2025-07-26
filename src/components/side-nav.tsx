
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  ShieldCheck,
  Building2,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Rides", href: "/dashboard/my-rides", icon: Car },
  { name: "Earnings", href: "/dashboard/earnings", icon: BadgeDollarSign },
  { name: "Ratings", href: "/dashboard/ratings", icon: Star },
  { name: "Promotions", href: "/dashboard/promotions", icon: Gift },
  {
    name: "Profile & Settings",
    icon: User,
    subItems: [
      { name: "Personal Details", href: "/dashboard/profile/personal", icon: User },
      { name: "Vehicle Details", href: "/dashboard/profile/vehicle", icon: CarTaxiFront },
      { name: "Bank Details", href: "/dashboard/profile/bank", icon: Banknote },
      { name: "Documents", href: "/dashboard/profile/documents", icon: FileText },
      { name: "App Settings", href: "/dashboard/profile/settings", icon: Settings },
    ],
  },
  {
    name: "Help & Support",
    icon: LifeBuoy,
    subItems: [
        { name: "Help Center", href: "/dashboard/support/help-center", icon: LifeBuoy },
        { name: "Contact Us", href: "/dashboard/support/contact", icon: Phone },
        { name: "About Company", href: "/dashboard/support/about", icon: Building2 },
        { name: "Safety", href: "/dashboard/support/safety", icon: ShieldCheck },
    ],
  },
];

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage and redirect to home
    localStorage.clear();
    router.push("/");
  };

  const isSubItemActive = (subItems: any[]) => {
    return subItems.some((item) => pathname === item.href);
  };

  const getDefaultAccordionValue = () => {
    const activeItem = menuItems.find(item => item.subItems && isSubItemActive(item.subItems));
    return activeItem ? activeItem.name : "";
  }
  
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
       <div className="flex-1">
        <Accordion type="single" collapsible defaultValue={getDefaultAccordionValue()}>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map((item) =>
                item.subItems ? (
                <AccordionItem value={item.name} key={item.name} className="border-b-0">
                    <AccordionTrigger
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary [&[data-state=open]>svg:last-child]:rotate-180",
                        isSubItemActive(item.subItems) && "text-primary bg-muted"
                    )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                        <ChevronDown className="h-4 w-4 ml-auto shrink-0 transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="ml-4 pl-4 border-l">
                        {item.subItems.map((subItem) => (
                        <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === subItem.href && "text-primary bg-muted"
                            )}
                        >
                            <subItem.icon className="h-4 w-4" />
                            {subItem.name}
                        </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                ) : (
                <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "text-primary bg-muted"
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                </Link>
                )
            )}
            </nav>
        </Accordion>
        </div>
        <div className="mt-auto p-4">
             <Button size="sm" variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
            </Button>
        </div>
    </div>
  );
}
