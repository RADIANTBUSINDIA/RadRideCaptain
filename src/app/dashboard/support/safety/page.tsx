
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function SafetyPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Safety Center
            </CardTitle>
            <CardDescription>
                Learn about our safety features and guidelines.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Information on safety protocols, emergency contacts, and trip sharing will be here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
