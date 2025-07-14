"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { optimizeRoute, type OptimizeRouteOutput } from "@/ai/flows/optimize-route";
import type { BookingRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Route, Clock, Lightbulb, LoaderCircle, User, MapPin } from "lucide-react";

interface RouteOptimizerProps {
  trip: BookingRequest;
  onEndTrip: () => void;
}

const formSchema = z.object({
  currentTrafficConditions: z.string().min(10, {
    message: "Please describe the traffic in a bit more detail (e.g., 'heavy congestion on the I-5 south').",
  }),
});

export default function RouteOptimizer({ trip, onEndTrip }: RouteOptimizerProps) {
  const [optimizationResult, setOptimizationResult] = useState<OptimizeRouteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentTrafficConditions: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setOptimizationResult(null);
    try {
      const result = await optimizeRoute({
        pickupLocation: trip.pickupLocation.name,
        destination: trip.destination.name,
        currentTrafficConditions: values.currentTrafficConditions,
      });
      setOptimizationResult(result);
    } catch (error) {
      console.error("Error optimizing route:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Trip Details</CardTitle>
        <CardDescription>Current trip information and AI route optimization.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2 p-3 border rounded-lg">
          <div className="flex items-center gap-2 font-semibold"><User className="w-4 h-4 text-primary" /> Customer</div>
          <p className="pl-6 text-sm">{trip.customerName}</p>
          <div className="flex items-center gap-2 font-semibold"><MapPin className="w-4 h-4 text-primary" /> Pickup</div>
          <p className="pl-6 text-sm">{trip.pickupLocation.name}</p>
          <div className="flex items-center gap-2 font-semibold"><MapPin className="w-4 h-4 text-red-500" /> Destination</div>
          <p className="pl-6 text-sm">{trip.destination.name}</p>
        </div>
        
        <Separator />

        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI Route Optimizer
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentTrafficConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Traffic Conditions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., heavy traffic on main street, accident on the highway..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isLoading ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      "Get Optimized Route"
                    )}
                  </Button>
                </form>
              </Form>

              {optimizationResult && (
                <div className="mt-6 space-y-4 text-sm">
                    <h4 className="font-semibold text-md">AI Suggestion:</h4>
                    <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Route className="w-5 h-5 mt-0.5 text-primary"/>
                            <div>
                                <p className="font-semibold">Optimized Route</p>
                                <p className="text-muted-foreground">{optimizationResult.optimizedRoute}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 mt-0.5 text-primary"/>
                             <div>
                                <p className="font-semibold">Estimated Travel Time</p>
                                <p className="text-muted-foreground">{optimizationResult.estimatedTravelTime}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 mt-0.5 text-primary"/>
                             <div>
                                <p className="font-semibold">Reasoning</p>
                                <p className="text-muted-foreground">{optimizationResult.reasoning}</p>
                            </div>
                        </div>
                    </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className="w-full" onClick={onEndTrip}>End Trip</Button>
      </CardFooter>
    </Card>
  );
}
