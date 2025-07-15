
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface WelcomeStepProps {
  onNext: () => void;
}

const welcomeSlides = [
  {
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "A modern car driving through a well-lit city tunnel at night.",
      hint: "car city",
    },
    title: "Welcome to Rad Captian",
    description: "Your journey as a driver starts here. Let's get you set up to start earning.",
  },
  {
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "A smiling person holding cash, representing earnings.",
      hint: "person earnings",
    },
    title: "Earn On Your Schedule",
    description: "Enjoy the flexibility of being your own boss. Drive when you want, earn what you need.",
  },
  {
    image: {
      src: "https://placehold.co/600x400.png",
      alt: "A smartphone displaying a map with a route, symbolizing smart tools.",
      hint: "phone map",
    },
    title: "Smart Tools for Success",
    description: "From real-time alerts to optimized routes, we're with you on every trip.",
  },
];

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full max-w-xl mx-auto">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {welcomeSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden border-none shadow-none bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center p-0 text-center">
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      data-ai-hint={slide.image.hint}
                      width={600}
                      height={400}
                      className="aspect-[3/2] w-full object-cover rounded-2xl"
                    />
                    <h2 className="text-3xl font-bold mt-8 mb-2">{slide.title}</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">{slide.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <div className="py-4 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: count }).map((_, i) => (
                    <span
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all ${
                        current === i + 1 ? "bg-primary w-4" : "bg-muted"
                        }`}
                    />
                ))}
            </div>
        </div>
      {current === count && (
        <div className="mt-4 flex flex-col items-center">
          <Button onClick={onNext} size="lg" className="bg-accent hover:bg-accent/90 w-full max-w-xs">
            Continue as Driver
          </Button>
        </div>
      )}
    </div>
  );
}
