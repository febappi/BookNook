import { Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import PopularCategories from "@/components/home/PopularCategories";
import BookGridSkeleton from "@/components/shared/BookGridSkeleton";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">BookNook - A Small Online Library</h1>
      <HeroSlider />

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Fresh on the shelf</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">New Arrivals</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">The six most recent books added by our readers.</p>
        </div>
        <Suspense fallback={<BookGridSkeleton count={6} />}>
          <NewArrivals />
        </Suspense>
      </section>

      <HowBorrowingWorks />
      <PopularCategories />
    </>
  );
}
