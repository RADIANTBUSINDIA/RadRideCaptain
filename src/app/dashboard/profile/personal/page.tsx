
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { User, Edit } from "lucide-react";
import DriverProfile from "@/components/driver-profile";
import { Button } from "@/components/ui/button";

export default function PersonalDetailsPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Details
                </CardTitle>
                <CardDescription>
                    View and manage your personal information.
                </CardDescription>
            </CardHeader>
        </Card>

        <DriverProfile />

         <Card>
            <CardFooter className="pt-6">
                <Button disabled><Edit className="w-4 h-4 mr-2"/> Edit Profile</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
