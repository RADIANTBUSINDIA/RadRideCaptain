
"use client";

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import SideNav from '@/components/side-nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import RadLogo from '@/components/rad-logo';
import { TripProvider } from '@/context/trip-context';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 1 && parts[0] === 'dashboard') return 'Home';
    const title = parts[parts.length - 1].replace(/-/g, ' ');
    return title.charAt(0).toUpperCase() + title.slice(1);
  };
  
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex min-h-screen w-full bg-muted/40">
        <SheetContent side="left" className="p-0 flex flex-col w-64">
           <SheetHeader className="sr-only">
            <SheetTitle>Main Menu</SheetTitle>
            <SheetDescription>Navigation menu for the driver dashboard.</SheetDescription>
          </SheetHeader>
          <div className="flex-1" onClick={() => setIsSidebarOpen(false)}>
            <SideNav />
          </div>
          <div className="p-4 flex justify-center border-t">
            <RadLogo />
          </div>
        </SheetContent>
        
        <div className="flex flex-col w-full">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 bg-primary text-primary-foreground px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:flex hover:bg-primary/90 hover:text-primary-foreground -ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight">{pageTitle}</h1>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-6">
            {children}
          </main>
        </div>
      </div>
    </Sheet>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TripProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </TripProvider>
  );
}
