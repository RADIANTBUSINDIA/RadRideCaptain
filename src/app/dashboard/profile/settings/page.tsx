
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                App Settings
            </CardTitle>
            <CardDescription>
                Manage your application preferences.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Application settings and preferences will be available here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
