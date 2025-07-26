
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CarTaxiFront, Edit } from "lucide-react";
import DriverProfile from "@/components/driver-profile";
import { Button } from "@/components/ui/button";


export default function VehicleDetailsPage() {
  return (
    <div className="space-y-6">
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
        </Card>

        <DriverProfile />

        <Card>
            <CardFooter className="pt-6">
                 <Button disabled><Edit className="w-4 h-4 mr-2"/> Edit Vehicle Details</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
