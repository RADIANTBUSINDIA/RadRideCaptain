
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LifeBuoy } from "lucide-react";

export default function HelpCenterPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-primary" />
                Help Center
            </CardTitle>
            <CardDescription>
                Find answers to frequently asked questions.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>The FAQ and help articles will be displayed here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
