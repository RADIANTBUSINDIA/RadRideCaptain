
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeDollarSign, Calendar, BarChart2, Gift, Download, AlertCircle, TrendingUp, Clock, Bike, IndianRupee } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const payouts = [
    { id: 'PAYOUT001', date: '2023-10-05', amount: '₹4,500.00', status: 'Completed' },
    { id: 'PAYOUT002', date: '2023-09-28', amount: '₹3,250.50', status: 'Completed' },
    { id: 'PAYOUT003', date: '2023-09-21', amount: '₹5,100.00', status: 'Pending' },
    { id: 'PAYOUT004', date: '2023-09-14', amount: '₹4,800.75', status: 'Completed' },
]

export default function EarningsPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BadgeDollarSign className="h-5 w-5 text-primary" />
                    My Earnings
                </CardTitle>
                <CardDescription>
                    Track your earnings, incentives, and payouts.
                </CardDescription>
            </CardHeader>
        </Card>

        <Tabs defaultValue="weekly" className="space-y-4">
            <TabsList>
                <TabsTrigger value="daily">Today</TabsTrigger>
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4">
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                             <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">₹1,250.50</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
                            <Bike className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">+12</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">8.5h</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Earnings per Hour</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">₹147.12</div></CardContent>
                    </Card>
                </div>
            </TabsContent>
             <TabsContent value="weekly" className="space-y-4">
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                             <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">₹8,750.00</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
                            <Bike className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">+85</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">45.2h</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Earnings per Hour</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">₹193.58</div></CardContent>
                    </Card>
                </div>
            </TabsContent>
             <TabsContent value="monthly" className="space-y-4">
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                             <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">₹35,200.75</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
                            <Bike className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">+340</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">180.5h</div></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Earnings per Hour</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">₹195.02</div></CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart2 className="w-5 h-5"/> Earnings Trend</CardTitle>
                    <CardDescription>Your weekly earnings overview.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                     <ChartContainer config={chartConfig} className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} >
                                <CartesianGrid vertical={false} />
                                 <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gift className="w-5 h-5"/> Incentive Tracker</CardTitle>
                         <CardDescription>Complete 15 rides to earn ₹300 bonus</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-bold">11 / 15 Rides</span>
                        </div>
                        <Progress value={(11/15)*100} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5"/> Upcoming Payout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">₹8,750.00</p>
                        <p className="text-sm text-muted-foreground">Scheduled for Friday, October 13, 2023</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BadgeDollarSign className="w-5 h-5"/> Payout History</CardTitle>
                <CardDescription>A list of all transfers to your bank account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                             <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payouts.map(payout => (
                            <TableRow key={payout.id}>
                                <TableCell className="font-medium">{payout.id}</TableCell>
                                <TableCell>{payout.date}</TableCell>
                                <TableCell>{payout.amount}</TableCell>
                                <TableCell>
                                    <Badge variant={payout.status === 'completed' ? 'default' : 'secondary'} className={payout.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                        {payout.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2"/> Download</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
             <CardFooter className="justify-end">
                <Button>View All Payouts</Button>
            </CardFooter>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Example Ride Breakdown</CardTitle>
                    <CardDescription>For ride on Oct 11, 2023</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Base Fare:</span> <span>₹150.00</span></div>
                    <div className="flex justify-between"><span>Distance Fare:</span> <span>₹85.50</span></div>
                    <div className="flex justify-between"><span>Time Fare:</span> <span>₹25.00</span></div>
                    <div className="flex justify-between text-green-600"><span>Weekly Bonus:</span> <span>+ ₹20.00</span></div>
                    <div className="flex justify-between text-green-600"><span>Tip from Rider:</span> <span>+ ₹30.00</span></div>
                    <div className="flex justify-between text-red-600"><span>Platform Fee:</span> <span>- ₹42.10</span></div>
                    <hr className="my-2"/>
                    <div className="flex justify-between font-bold"><span>Your Earning:</span> <span>₹268.40</span></div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Tax Summary (TDS)</CardTitle>
                    <CardDescription>For FY 2023-2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span>Total Taxable Earnings:</span> <span>₹1,25,400.00</span></div>
                        <div className="flex justify-between"><span>TDS Deducted:</span> <span>₹6,270.00</span></div>
                    </div>
                     <div className="mt-4 p-3 bg-muted rounded-lg flex items-start gap-3 text-sm">
                        <AlertCircle className="w-8 h-8 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">TDS Certificates will be available at the end of each quarter.</p>
                            <p className="text-muted-foreground">You can download them from here once they are issued.</p>
                        </div>
                     </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Learn More</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
