
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function PersonalDetailsPage() {
  return (
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
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Personal profile information will be displayed here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
