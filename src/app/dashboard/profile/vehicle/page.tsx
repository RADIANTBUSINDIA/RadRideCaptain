
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CarTaxiFront } from "lucide-react";

export default function VehicleDetailsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <CarTaxiFront className="h-5 w-5 text-primary" />
                Vehicle Details
            </CardTitle>
            <CardDescription>
                Manage your vehicle information and documents.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Your registered vehicle details will appear here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
