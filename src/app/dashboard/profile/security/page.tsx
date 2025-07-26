
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Lock, Fingerprint, KeyRound, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SecurityPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Security Settings
            </CardTitle>
            <CardDescription>
                Manage your account password and security options.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-6">
                <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2"><KeyRound className="w-4 h-4"/> Change Password</h3>
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" placeholder="Enter your current password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" placeholder="Enter a new strong password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm your new password" />
                    </div>
                </div>

                <Separator />
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                        <h3 className="font-semibold flex items-center gap-2"><Fingerprint className="w-4 h-4"/> Biometric Login</h3>
                        <p className="text-sm text-muted-foreground">Enable login with your fingerprint or face ID.</p>
                    </div>
                    <Switch id="biometric-login" />
                </div>
            </form>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button disabled>
                <Save className="w-4 h-4 mr-2" />
                Save Security Changes
            </Button>
        </CardFooter>
    </Card>
  );
}
