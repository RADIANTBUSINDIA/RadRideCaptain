
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ThumbsUp, MessageSquare, Sparkles, ShieldCheck, TrendingUp, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ratingsData = {
    overallRating: 4.8,
    totalRatings: 152,
    ratingBreakdown: [
        { stars: 5, count: 120 },
        { stars: 4, count: 25 },
        { stars: 3, count: 5 },
        { stars: 2, count: 1 },
        { stars: 1, count: 1 },
    ],
    compliments: [
        { text: "Excellent Service", count: 45, icon: ThumbsUp },
        { text: "Clean Car", count: 62, icon: Sparkles },
        { text: "Great Conversation", count: 30, icon: MessageSquare },
        { text: "Safe Driver", count: 55, icon: ShieldCheck },
    ],
    feedback: [
        { id: 1, rider: "Priya S.", rating: 5, comment: "Very professional and polite driver. The car was spotless!" },
        { id: 2, rider: "Amit K.", rating: 5, comment: "Reached the destination very quickly. Great knowledge of the city routes." },
        { id: 3, rider: "Sunita R.", rating: 4, comment: "Good ride, but the AC could have been a bit stronger." },
    ]
};


export default function RatingsPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Ratings & Feedback
                </CardTitle>
                <CardDescription>
                    See your driver rating and feedback from riders.
                </CardDescription>
            </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card className="lg:col-span-1">
                <CardHeader className="items-center text-center">
                    <CardDescription>Overall Rating</CardDescription>
                    <CardTitle className="text-5xl font-bold flex items-center justify-center gap-2">
                        <Star className="w-10 h-10 text-amber-400 fill-amber-400" />
                        {ratingsData.overallRating.toFixed(1)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Based on {ratingsData.totalRatings} ratings</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {ratingsData.ratingBreakdown.map(item => (
                            <div key={item.stars} className="flex items-center gap-4">
                                <span className="text-xs w-12 text-muted-foreground flex items-center gap-1">{item.stars} <Star className="w-3 h-3"/></span>
                                <Progress value={(item.count / ratingsData.totalRatings) * 100} className="flex-1 h-2"/>
                                <span className="text-xs w-8 text-right font-medium">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ThumbsUp className="w-5 h-5"/> Rider Compliments</CardTitle>
                    <CardDescription>What riders liked about your service.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {ratingsData.compliments.map(comp => (
                        <div key={comp.text} className="p-4 bg-muted rounded-lg flex items-center gap-3">
                            <comp.icon className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-semibold">{comp.text}</p>
                                <p className="text-sm text-muted-foreground">{comp.count} times</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5"/> Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {ratingsData.feedback.map(fb => (
                        <div key={fb.id}>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person avatar" />
                                    <AvatarFallback>{fb.rider.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{fb.rider}</p>
                                        <div className="flex items-center gap-1 text-sm">
                                            <span className="font-bold">{fb.rating}</span>
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{`"${fb.comment}"`}</p>
                                </div>
                            </div>
                            <Separator className="my-4"/>
                        </div>
                    ))}
                     <div className="text-center">
                        <Button variant="link">View All Feedback</Button>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Improve Your Ratings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>✔️ Maintain a clean and comfortable vehicle.</p>
                    <p>✔️ Greet riders politely and confirm their destination.</p>
                    <p>✔️ Drive safely and follow traffic rules.</p>
                    <p>✔️ Offer amenities like chargers or music if possible.</p>
                    <p>✔️ End the trip with a friendly closing.</p>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground">Unfair rating? <a href="#" className="text-primary">Report an issue</a></p>
                 </CardFooter>
            </Card>
        </div>
    </div>
  );
}
