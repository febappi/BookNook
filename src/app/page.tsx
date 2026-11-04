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

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <p className="mt-2 text-gray-500">The latest books added to our library</p>
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
