'use client';

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
    {
        quote: "InvoicePilot has revolutionized our billing process. The AI assistant is incredibly intuitive and saves us hours every week.",
        name: "Sarah L.",
        title: "CEO, Tech Innovators",
        avatar: "https://placehold.co/100x100.png?text=SL",
    },
    {
        quote: "The best invoicing tool on the market. Simple, powerful, and the conversational UI is a game-changer for our non-technical staff.",
        name: "Michael B.",
        title: "Founder, Creative Minds",
        avatar: "https://placehold.co/100x100.png?text=MB",
    },
    {
        quote: "I was skeptical about an AI for invoicing, but InvoicePilot proved me wrong. It's fast, accurate, and professional.",
        name: "Jessica P.",
        title: "Freelance Designer",
        avatar: "https://placehold.co/100x100.png?text=JP",
    },
];


export function TestimonialsCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-lg"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-background/50 border-0 shadow-none">
                <CardContent className="flex flex-col gap-6 p-6 justify-center">
                    <blockquote className="text-lg font-semibold leading-snug">
                       “{testimonial.quote}”
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  )
}
