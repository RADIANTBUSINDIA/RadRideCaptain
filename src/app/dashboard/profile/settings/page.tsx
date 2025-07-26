
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings, Bell, MapPin, Languages, Music, Sun, Moon, Database, Car, Zap, Calendar, Lock, Info, ChevronRight, BellRing } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const SettingsItem = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description: string, children?: React.ReactNode }) => (
    <div className="flex items-start justify-between py-4">
        <div className="flex items-start gap-4">
            <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            {children}
        </div>
    </div>
);


export default function SettingsPage() {
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    App Settings
                </CardTitle>
                <CardDescription>
                    Manage your application preferences to customize your driving experience.
                </CardDescription>
            </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                    <BellRing className="w-5 h-5"/> Notifications
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SettingsItem icon={Bell} title="Alert Frequency" description="Set how often ride alerts appear">
                    <Select defaultValue="10s">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5s">Every 5s</SelectItem>
                            <SelectItem value="10s">Every 10s</SelectItem>
                            <SelectItem value="15s">Every 15s</SelectItem>
                        </SelectContent>
                    </Select>
                </SettingsItem>
                <Separator />
                <SettingsItem icon={Music} title="Notification Sound" description="Enable or disable ride alert sound">
                    <Switch defaultChecked/>
                </SettingsItem>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-lg">
                    <Zap className="w-5 h-5"/> Automation & Preferences
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <SettingsItem icon={MapPin} title="Area Preferences" description="Select preferred zones to accept rides from">
                     <Button variant="outline" size="sm">Manage Zones <ChevronRight className="w-4 h-4 ml-1"/></Button>
                 </SettingsItem>
                 <Separator />
                 <SettingsItem icon={Zap} title="Auto-Accept Rides" description="Automatically accept nearby ride requests">
                    <Switch />
                </SettingsItem>
                 <Separator />
                 <SettingsItem icon={Calendar} title="Weekly Availability" description="Mark available days and hours">
                     <Button variant="outline" size="sm">Set Schedule <ChevronRight className="w-4 h-4 ml-1"/></Button>
                 </SettingsItem>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-lg">
                    <Settings className="w-5 h-5"/> General
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <SettingsItem icon={Languages} title="Language Preference" description="Choose app language (Hindi, English, etc.)">
                     <Select defaultValue="english">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="kannada">Kannada</SelectItem>
                        </SelectContent>
                    </Select>
                 </SettingsItem>
                 <Separator />
                 <SettingsItem icon={Sun} title="Theme Mode" description="Light mode / Dark mode toggle">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-muted">Light</Button>
                        <Button variant="outline" size="sm">Dark</Button>
                    </div>
                 </SettingsItem>
                 <Separator />
                 <SettingsItem icon={Database} title="Data Usage Settings" description="Enable low data mode">
                     <Switch />
                 </SettingsItem>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-lg">
                    <Lock className="w-5 h-5"/> Account & Privacy
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SettingsItem icon={Car} title="Vehicle Info Management" description="Update vehicle type, license plate, etc.">
                    <Button variant="outline" size="sm">Update Info <ChevronRight className="w-4 h-4 ml-1"/></Button>
                </SettingsItem>
                <Separator />
                <SettingsItem icon={Lock} title="Privacy & Permissions" description="Manage location access, microphone, etc.">
                    <Button variant="outline" size="sm">Manage <ChevronRight className="w-4 h-4 ml-1"/></Button>
                </SettingsItem>
                <Separator />
                <SettingsItem icon={Info} title="App Info & Version" description="View app version, build number, and check for updates">
                    <span className="text-sm text-muted-foreground">v1.0.0</span>
                </SettingsItem>
            </CardContent>
        </Card>
    </div>
  );
}
