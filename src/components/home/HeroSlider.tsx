"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { buttonVariants } from "@/components/ui/button";

const slides = [
  {
    tag: "Welcome",
    lines: ["A library", "run by", "readers."],
    description: "Find a book on someone else's shelf, borrow it for a week and pass it back when you are done.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200",
    label: "Free to join",
  },
  {
    tag: "Borrowing",
    lines: ["Borrow", "any book", "for 7 days."],
    description: "Pick a book you like, confirm the borrow, and return it from My Borrows when you finish reading.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200",
    label: "7 day loans",
  },
  {
    tag: "Sharing",
    lines: ["Share", "the books", "you own."],
    description: "Add the books already on your shelf so other readers in the community can borrow them too.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200",
    label: "Add yours",
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const getTextAnimation = (index: number, delay: number) => {
    if (reduceMotion) {
      return {};
    }
    const isActive = index === activeIndex;
    return {
      initial: index === 0 ? false : { opacity: 0, y: 32 },
      animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
      transition: { duration: 0.5, delay: isActive ? delay : 0, ease: "easeOut" as const },
    };
  };

  return (
    <section className="border-b-2 border-ink">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ el: ".hero-pagination", clickable: true }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.tag}>
            <div className="mx-auto grid max-w-6xl md:grid-cols-12 md:border-x-2 md:border-ink">
              <div className="flex flex-col justify-between gap-10 border-b-2 border-ink px-4 py-8 md:col-span-7 md:min-h-[520px] md:border-r-2 md:border-b-0 md:p-10">
                <div className="flex items-center justify-between text-xs font-semibold tracking-[0.15em] uppercase">
                  <span>
                    0{index + 1} / 0{slides.length}
                  </span>
                  <span className="text-cobalt">{slide.tag}</span>
                </div>

                <motion.h2
                  {...getTextAnimation(index, 0.05)}
                  className="text-[13vw] leading-[0.88] uppercase sm:text-6xl lg:text-7xl"
                >
                  {slide.lines.map((line, lineIndex) => (
                    <span key={line} className={lineIndex === slide.lines.length - 1 ? "block text-cobalt" : "block"}>
                      {line}
                    </span>
                  ))}
                </motion.h2>

                <motion.div
                  {...getTextAnimation(index, 0.2)}
                  className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                >
                  <p className="max-w-xs text-base leading-snug">{slide.description}</p>
                  <Link href="/books" className={buttonVariants({ size: "lg" })}>
                    Browse Books
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </motion.div>
              </div>

              <div className="relative h-72 overflow-hidden bg-ink sm:h-96 md:col-span-5 md:h-auto">
                <Image
                  src={slide.image}
                  alt={slide.lines.join(" ")}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-cobalt mix-blend-multiply" />
                <span className="absolute bottom-0 left-0 bg-white px-4 py-3 font-display text-sm uppercase">
                  {slide.label}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t-2 border-ink px-4 py-3 md:border-x-2">
        <div className="hero-pagination" />
        <span className="text-xs font-semibold tracking-[0.15em] uppercase">Add · Borrow · Return</span>
      </div>
    </section>
  );
};

export default HeroSlider;
