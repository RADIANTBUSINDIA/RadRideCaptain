
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingPage from "./onboarding/page";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we are in the browser
    if (typeof window !== "undefined") {
      try {
        const storedProfile = localStorage.getItem("driverProfile");
        if (storedProfile) {
          // If a profile exists, the user is "logged in"
          router.replace("/dashboard");
        } else {
          // No profile, user needs to log in/register
          setLoading(false);
        }
      } catch (error) {
        console.error("Could not access local storage", error);
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <OnboardingPage />
    </main>
  );
}
