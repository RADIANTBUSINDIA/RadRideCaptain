"use client";

import { useState } from "react";
import type { Trip } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart as BarChartIcon, BadgeDollarSign, History, User, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import DriverProfile from "./driver-profile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DriverStatsProps {
  tripHistory: Trip[];
}

const chartConfig = {
  accepted: {
    label: "Accepted",
    color: "hsl(var(--primary))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

const NavItem = ({ icon: Icon, label, isActive, onClick }: { icon: React.ElementType, label: string, isActive: boolean, onClick: () => void }) => (
    <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
            "w-full justify-start text-left h-12 px-4 text-base",
            isActive && "bg-accent text-accent-foreground"
        )}
    >
        <Icon className="w-5 h-5 mr-3" />
        <span>{label}</span>
        {isActive && <ChevronRight className="w-5 h-5 ml-auto" />}
    </Button>
);

export default function DriverStats({ tripHistory }: DriverStatsProps) {
  const [activeTab, setActiveTab] = useState("history");

  const completedTrips = tripHistory.filter(t => t.status === 'completed');
  const rejectedTrips = tripHistory.filter(t => t.status === 'rejected');

  const totalEarnings = completedTrips.reduce((sum, trip) => sum + trip.finalFare + trip.tip, 0);
  const totalFare = completedTrips.reduce((sum, trip) => sum + trip.finalFare, 0);
  const totalTips = completedTrips.reduce((sum, trip) => sum + trip.tip, 0);
  const incentives = completedTrips.length * 20;

  const performanceData = [
    { name: 'Rides', accepted: completedTrips.length, rejected: rejectedTrips.length },
  ];

  const renderContent = () => {
    switch(activeTab) {
        case 'history':
            return (
                <ScrollArea className="h-full">
                    <div className="space-y-4 pr-4">
                        {tripHistory.length > 0 ? tripHistory.map((trip) => (
                        <div key={trip.id} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-center">
                            <span className="font-semibold">{trip.customerName}</span>
                            {trip.status === 'completed' ? (
                                <span className="text-sm font-bold text-green-500">₹{(trip.finalFare + trip.tip).toFixed(2)}</span>
                            ) : (
                                <span className="text-sm font-semibold text-red-500">Rejected</span>
                            )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{trip.pickupLocation.name} to {trip.destination.name}</p>
                            <p className="text-xs text-muted-foreground">{format(new Date(trip.timestamp), "MMM d, yyyy 'at' h:mm a")}</p>
                            {trip.status === 'completed' && trip.tip > 0 && (
                                <p className="text-xs text-amber-500 font-medium mt-1">Includes ₹{trip.tip.toFixed(2)} tip</p>
                            )}
                        </div>
                        )) : (
                            <div className="text-center text-muted-foreground py-10">
                                <p>No trip history yet.</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            );
        case 'earnings':
            return (
                 <div className="space-y-4">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-center text-3xl font-bold text-primary">₹{totalEarnings.toFixed(2)}</CardTitle>
                            <CardDescription className="text-center">Total Earnings</CardDescription>
                        </CardHeader>
                    </Card>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <Card><CardHeader className="p-3"><CardDescription>Total Fares</CardDescription><CardTitle>₹{totalFare.toFixed(2)}</CardTitle></CardHeader></Card>
                        <Card><CardHeader className="p-3"><CardDescription>Total Tips</CardDescription><CardTitle>₹{totalTips.toFixed(2)}</CardTitle></CardHeader></Card>
                        <Card><CardHeader className="p-3"><CardDescription>Incentives</CardDescription><CardTitle className="text-green-500">+ ₹{incentives.toFixed(2)}</CardTitle></CardHeader></Card>
                        <Card><CardHeader className="p-3"><CardDescription>Completed Rides</CardDescription><CardTitle>{completedTrips.length}</CardTitle></CardHeader></Card>
                    </div>
                </div>
            );
        case 'performance':
            return (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="text-center"><CardHeader className="p-3"><CardDescription>Accepted</CardDescription><CardTitle className="text-3xl">{completedTrips.length}</CardTitle></CardHeader></Card>
                        <Card className="text-center"><CardHeader className="p-3"><CardDescription>Rejected</CardDescription><CardTitle className="text-3xl">{rejectedTrips.length}</CardTitle></CardHeader></Card>
                    </div>
                    <div className="h-48">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performanceData} layout="vertical" margin={{ left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <ChartTooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                                    <Bar dataKey="accepted" stackId="a" fill="var(--color-accepted)" radius={[4, 4, 4, 4]} name="Accepted"/>
                                    <Bar dataKey="rejected" stackId="a" fill="var(--color-rejected)" radius={[4, 4, 4, 4]} name="Rejected"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>
            );
        case 'profile':
            return (
                <ScrollArea className="h-full">
                    <DriverProfile />
                </ScrollArea>
            );
        default:
            return null;
    }
  }

  return (
    <Card className="h-full flex flex-col">
        <CardHeader>
            <CardTitle>Driver Hub</CardTitle>
            <CardDescription>Your performance, earnings, and profile.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
            <div className="md:col-span-1 flex flex-col space-y-2 border-r pr-4">
                 <NavItem icon={History} label="History" isActive={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                 <NavItem icon={BadgeDollarSign} label="Earnings" isActive={activeTab === 'earnings'} onClick={() => setActiveTab('earnings')} />
                 <NavItem icon={BarChartIcon} label="Performance" isActive={activeTab === 'performance'} onClick={() => setActiveTab('performance')} />
                 <NavItem icon={User} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            </div>
            <div className="md:col-span-2 overflow-y-auto">
                {renderContent()}
            </div>
        </CardContent>
    </Card>
  );
}
