
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Banknote, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BankDetailsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-primary" />
                Bank Details
            </CardTitle>
            <CardDescription>
                Manage your bank account for payouts. Your details are kept secure.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input id="accountHolder" placeholder="Enter name as per bank records" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="accountNumber">Bank Account Number</Label>
                    <Input id="accountNumber" placeholder="Enter your account number" defaultValue="************1234" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="ifsc">IFSC Code</Label>
                        <Input id="ifsc" placeholder="Enter IFSC code" defaultValue="ABCD0123456" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID (Optional)</Label>
                        <Input id="upiId" placeholder="Enter your UPI ID" />
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button disabled>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
            </Button>
        </CardFooter>
    </Card>
  );
}
