"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    label: "Welcome to BookNook",
    title: "A small library that lives on the web",
    description:
      "Browse books shared by readers like you, borrow one for a week, and return it when you are done. No library card needed.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400",
  },
  {
    label: "Borrow for seven days",
    title: "Your next favourite read is one click away",
    description:
      "Find a book you like, confirm the borrow, and it shows up in your borrow list right away with the return date.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400",
  },
  {
    label: "Share your shelf",
    title: "Give your books a second life",
    description:
      "Add the books you have already finished so other readers can enjoy them. You stay in control of every book you add.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1400",
  },
];

const HeroSlider = () => {
  return (
    <section className="border-b bg-secondary">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-16 md:grid-cols-2 md:gap-12 md:py-20">
              <div className="order-2 md:order-1">
                <p className="text-sm font-semibold tracking-widest text-primary uppercase">{slide.label}</p>
                <h2 className="mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">{slide.title}</h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {slide.description}
                </p>
                <Link href="/books" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
                  Browse Books
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </div>
              <div className="relative order-1 h-56 overflow-hidden rounded-lg border sm:h-72 md:order-2 md:h-96">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
