
import { Car } from 'lucide-react';

export default function RadLogo() {
  return (
    <div className="flex flex-col items-center space-y-2">
        <div className="p-2 bg-primary rounded-full text-primary-foreground">
             <Car className="h-8 w-8" />
        </div>
        <div className="text-center">
             <p className="font-bold text-sm tracking-wider">DriverSidekick</p>
             <p className="text-xs text-muted-foreground">v1.0.0</p>
        </div>
    </div>
  );
}
