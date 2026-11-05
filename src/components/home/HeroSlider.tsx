"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { buttonVariants } from "@/components/ui/button";

const slides = [
  {
    title: "Welcome to BookNook",
    description: "A small online library where you can find, borrow and return books easily.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600",
  },
  {
    title: "Borrow Books for 7 Days",
    description: "Pick a book you like, confirm the borrow and return it when you finish reading.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600",
  },
  {
    title: "Share Your Own Books",
    description: "Add the books you already have so that other readers can borrow and enjoy them.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600",
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
      initial: { opacity: 0, y: 24 },
      animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
      transition: { duration: 0.6, delay: isActive ? delay : 0, ease: "easeOut" as const },
    };
  };

  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-[420px] md:h-[520px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 text-center text-white">
                <motion.h2 {...getTextAnimation(index, 0.1)} className="text-3xl font-bold sm:text-4xl md:text-5xl">
                  {slide.title}
                </motion.h2>
                <motion.p {...getTextAnimation(index, 0.25)} className="mt-4 max-w-xl text-base text-gray-200 sm:text-lg">
                  {slide.description}
                </motion.p>
                <motion.div {...getTextAnimation(index, 0.4)} className="mt-8">
                  <Link href="/books" className={buttonVariants({ size: "lg" })}>
                    Browse Books
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
