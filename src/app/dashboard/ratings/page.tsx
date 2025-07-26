
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function RatingsPage() {
  return (
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
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Your rating will be available after a few trips.</p>
                <p className="text-sm">Keep up the great service!</p>
            </div>
        </CardContent>
    </Card>
  );
}
