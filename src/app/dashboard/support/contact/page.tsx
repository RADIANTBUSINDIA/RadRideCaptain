
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

export default function ContactUsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Us
            </CardTitle>
            <CardDescription>
                Get in touch with our support team.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Support contact information (phone, email, chat) will be here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
