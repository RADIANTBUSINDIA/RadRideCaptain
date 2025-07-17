
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
      src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&h=400&fit=crop",
      alt: "A yellow sports car parked on the street.",
      hint: "sports car street",
    },
    title: "Welcome Aboard, RadCaptian",
    description: "Your journey as a driver starts here. Let's get you set up to start earning on the road.",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&h=400&fit=crop",
      alt: "A person confidently driving a car on an open road.",
      hint: "person driving car",
    },
    title: "Drive Your Own Course",
    description: "Enjoy the freedom of being your own boss. Drive when you want, and navigate your own success.",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1614026480424-a2126a31d2b2?q=80&w=600&h=400&fit=crop",
      alt: "A modern car dashboard with a navigation system.",
      hint: "car dashboard navigation",
    },
    title: "Premium Tools for a Premium Service",
    description: "From smart navigation to seamless bookings, we provide the tools you need for every trip.",
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
