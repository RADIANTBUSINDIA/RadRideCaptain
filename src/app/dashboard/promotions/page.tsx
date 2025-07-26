
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";

export default function PromotionsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Promotions & Referrals
            </CardTitle>
            <CardDescription>
                Check out the latest promotions, bonuses, and referral programs.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-12">
                <p>No active promotions at the moment.</p>
                <p className="text-sm">Check back later for new offers.</p>
            </div>
        </CardContent>
    </Card>
  );
}
