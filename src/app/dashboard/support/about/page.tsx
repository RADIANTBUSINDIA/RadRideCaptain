
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                About Rad RideCaptain
            </CardTitle>
            <CardDescription>
                Information about the company and the app.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Company details, version information, and terms of service will be displayed here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
