import { Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import PopularCategories from "@/components/home/PopularCategories";
import BookGridSkeleton from "@/components/shared/BookGridSkeleton";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">BookNook - A Small Online Library</h1>
      <HeroSlider />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <Reveal className="mb-12">
          <SectionHeading
            number="01"
            label="New Arrivals"
            title={
              <>
                Fresh on <span className="text-cobalt">the shelf</span>
              </>
            }
            description="The six latest books readers have added to the library."
          />
        </Reveal>
        <Suspense fallback={<BookGridSkeleton count={6} />}>
          <NewArrivals />
        </Suspense>
      </section>

      <HowBorrowingWorks />
      <PopularCategories />
    </>
  );
}
