
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BadgeDollarSign } from "lucide-react";

export default function EarningsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BadgeDollarSign className="h-5 w-5 text-primary" />
                Earnings
            </CardTitle>
            <CardDescription>
                Track your earnings, incentives, and payouts.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>No earnings data to display.</p>
                <p className="text-sm">Your earnings from completed trips will show up here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
