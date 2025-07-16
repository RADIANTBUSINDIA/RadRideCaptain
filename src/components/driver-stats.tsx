"use client";

import type { Trip } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart as BarChartIcon, BadgeDollarSign, History, User } from "lucide-react";
import { format } from "date-fns";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import DriverProfile from "./driver-profile";

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


export default function DriverStats({ tripHistory }: DriverStatsProps) {
  const completedTrips = tripHistory.filter(t => t.status === 'completed');
  const rejectedTrips = tripHistory.filter(t => t.status === 'rejected');

  const totalEarnings = completedTrips.reduce((sum, trip) => sum + trip.finalFare + trip.tip, 0);
  const totalFare = completedTrips.reduce((sum, trip) => sum + trip.finalFare, 0);
  const totalTips = completedTrips.reduce((sum, trip) => sum + trip.tip, 0);
  // Using a mock incentive value
  const incentives = completedTrips.length * 20; 

  const performanceData = [
    { name: 'Rides', accepted: completedTrips.length, rejected: rejectedTrips.length },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Driver Hub</CardTitle>
        <CardDescription>Your performance, earnings, and profile.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <Tabs defaultValue="history" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history"><History className="w-4 h-4 mr-1" /> History</TabsTrigger>
            <TabsTrigger value="earnings"><BadgeDollarSign className="w-4 h-4 mr-1"/> Earnings</TabsTrigger>
            <TabsTrigger value="performance"><BarChartIcon className="w-4 h-4 mr-1"/> Performance</TabsTrigger>
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-1" /> Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="flex-1 mt-4 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4">
                {tripHistory.map((trip) => (
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
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="earnings" className="flex-1 mt-4">
            <div className="space-y-4">
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-center text-3xl font-bold text-primary">₹{totalEarnings.toFixed(2)}</CardTitle>
                        <CardDescription className="text-center">Total Earnings</CardDescription>
                    </CardHeader>
                </Card>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <Card>
                        <CardHeader className="p-3">
                            <CardDescription>Total Fares</CardDescription>
                            <CardTitle>₹{totalFare.toFixed(2)}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="p-3">
                            <CardDescription>Total Tips</CardDescription>
                            <CardTitle>₹{totalTips.toFixed(2)}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="p-3">
                            <CardDescription>Incentives</CardDescription>
                            <CardTitle className="text-green-500">+ ₹{incentives.toFixed(2)}</CardTitle>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader className="p-3">
                            <CardDescription>Completed Rides</CardDescription>
                            <CardTitle>{completedTrips.length}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="flex-1 mt-4">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                     <Card className="text-center">
                        <CardHeader className="p-3">
                            <CardDescription>Accepted Rides</CardDescription>
                            <CardTitle className="text-3xl">{completedTrips.length}</CardTitle>
                        </CardHeader>
                    </Card>
                     <Card className="text-center">
                        <CardHeader className="p-3">
                            <CardDescription>Rejected Rides</CardDescription>
                            <CardTitle className="text-3xl">{rejectedTrips.length}</CardTitle>
                        </CardHeader>
                    </Card>
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
          </TabsContent>

          <TabsContent value="profile" className="flex-1 mt-4 overflow-hidden">
             <ScrollArea className="h-full">
                <DriverProfile />
             </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
