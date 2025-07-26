
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Banknote } from "lucide-react";

export default function BankDetailsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-primary" />
                Bank Details
            </CardTitle>
            <CardDescription>
                Manage your bank account for payouts.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>Your bank account information for receiving payments will be shown here.</p>
            </div>
        </CardContent>
    </Card>
  );
}
