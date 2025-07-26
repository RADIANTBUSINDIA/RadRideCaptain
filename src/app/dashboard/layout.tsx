
"use client";

import React, { useState } from 'react';
import SideNav from '@/components/side-nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Car } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="hidden md:block">
        <SideNav />
      </div>
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <div onClick={() => setIsSidebarOpen(false)}>
                        <SideNav />
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
                <Car className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold tracking-tight">RadCaptian</h1>
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0">
            {children}
        </main>
      </div>
    </div>
  );
}
