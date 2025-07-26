
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function MyRidesPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                My Rides
            </CardTitle>
            <CardDescription>
                View your past and upcoming ride history.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>No ride history available yet.</p>
                <p className="text-sm">Completed rides will appear here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
