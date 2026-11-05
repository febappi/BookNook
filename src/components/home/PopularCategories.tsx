import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";

const categories = [
  { name: "Fiction", code: "FIC", description: "Novels and stories to get lost in" },
  { name: "Science", code: "SCI", description: "How the world and the universe work" },
  { name: "History", code: "HIS", description: "People, places and the past" },
  { name: "Kids", code: "KID", description: "Picture books and first chapters" },
  { name: "Others", code: "OTH", description: "Habits, ideas and everything else" },
];

const PopularCategories = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          number="03"
          label="Shelves"
          title={
            <>
              Pick a <span className="text-cobalt">shelf</span>
            </>
          }
          description="Every book in BookNook sits on one of these five shelves."
        />
      </Reveal>

      <ul className="mt-12 border-t-2 border-ink">
        {categories.map((category, index) => (
          <Reveal key={category.name} delay={index * 0.06}>
            <li>
              <Link
                href={`/books?category=${category.name}`}
                className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-ink py-5 transition-colors hover:bg-cobalt hover:text-white sm:grid-cols-[4rem_1fr_1fr_auto] sm:py-6"
              >
                <span className="pl-2 text-xs font-semibold tracking-[0.15em] tabular-nums">0{index + 1}</span>
                <span className="font-display text-3xl uppercase sm:text-5xl">{category.name}</span>
                <span className="hidden text-sm text-muted-foreground group-hover:text-white/80 sm:block">
                  {category.code} — {category.description}
                </span>
                <ArrowUpRight className="mr-2 size-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

export default PopularCategories;
