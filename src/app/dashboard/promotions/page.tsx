
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Megaphone, Users, ArrowRight, Share2, Sparkles, Trophy } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const activeIncentives = [
    {
        title: "Weekly Quest",
        description: "Complete 50 rides this week to earn a ₹1000 bonus.",
        progress: 32,
        target: 50,
    },
    {
        title: "Morning Hustle",
        description: "Complete 5 rides between 7 AM and 10 AM today for a ₹150 bonus.",
        progress: 4,
        target: 5,
    },
];

const pastIncentives = [
     {
        title: "Weekend Warrior",
        description: "Completed 30 rides last weekend and earned a ₹750 bonus.",
        progress: 30,
        target: 30,
    },
]

export default function PromotionsPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    Promotions & Referrals
                </CardTitle>
                <CardDescription>
                    Check out the latest promotions, bonuses, and referral programs to maximize your earnings.
                </CardDescription>
            </CardHeader>
        </Card>
        
        <Tabs defaultValue="active">
            <TabsList>
                <TabsTrigger value="active">Active Promotions</TabsTrigger>
                <TabsTrigger value="past">Past Promotions</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-6 mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg"><Megaphone className="w-5 h-5"/> Active Incentives</CardTitle>
                        <CardDescription>Complete these challenges to earn extra cash.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {activeIncentives.map((incentive, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-3">
                                <p className="font-semibold">{incentive.title}</p>
                                <p className="text-sm text-muted-foreground">{incentive.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span>Progress</span>
                                    <span className="font-medium">{incentive.progress} / {incentive.target} Rides</span>
                                </div>
                                <Progress value={(incentive.progress / incentive.target) * 100} />
                                 <p className="text-xs text-muted-foreground text-right">Time remaining: 2 days 4 hours</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-3 text-lg"><Users className="w-5 h-5"/> Referral Program</CardTitle>
                             <CardDescription>Invite friends to drive and earn when they sign up.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-3xl font-bold text-primary">Earn ₹500</p>
                            <p className="text-sm text-muted-foreground">for every new driver you refer.</p>
                            <div className="my-4 p-2 bg-muted rounded-md font-mono text-lg tracking-widest">
                                YOUR-CODE-XYZ
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full"><Share2 className="w-4 h-4 mr-2"/> Share Your Code</Button>
                        </CardFooter>
                    </Card>
                     <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-3 text-lg"><Sparkles className="w-5 h-5"/> Special Campaigns</CardTitle>
                             <CardDescription>Don't miss out on these limited-time offers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 border rounded-lg">
                                <p className="font-semibold">Festival Bonus</p>
                                <p className="text-sm text-muted-foreground">Earn 20% extra on all rides during the festival weekend.</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="font-semibold">Night Owl Incentive</p>
                                <p className="text-sm text-muted-foreground">Get a ₹50 bonus for every ride completed between 12 AM and 4 AM.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="past" className="space-y-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg"><Trophy className="w-5 h-5"/> Completed Incentives</CardTitle>
                        <CardDescription>A record of your past achievements.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {pastIncentives.map((incentive, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{incentive.title}</p>
                                     <span className="text-sm font-medium text-green-600">Bonus Earned: ₹750</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{incentive.description}</p>
                                <Progress value={(incentive.progress / incentive.target) * 100} />
                            </div>
                        ))}
                         <div className="text-center text-muted-foreground py-4">
                            <p>You have no other past promotions.</p>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

        <Card className="bg-muted">
            <CardHeader className="flex-row justify-between items-center">
                <div>
                    <CardTitle>Terms & Conditions</CardTitle>
                    <CardDescription>Review the rules for all promotions.</CardDescription>
                </div>
                <Button variant="outline">View T&Cs <ArrowRight className="w-4 h-4 ml-2"/></Button>
            </CardHeader>
        </Card>
    </div>
  );
}
