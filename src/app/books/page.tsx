import type { Metadata } from "next";
import { Suspense } from "react";
import BookFilters from "@/components/books/BookFilters";
import BookResults from "@/components/books/BookResults";
import BookGridSkeleton from "@/components/shared/BookGridSkeleton";
import { BookFilterValues } from "@/lib/types";

export const metadata: Metadata = {
  title: "All Books",
};

const getText = (value: string | string[] | undefined) => (typeof value === "string" ? value : "");

const AllBooksPage = async ({ searchParams }: PageProps<"/books">) => {
  const params = await searchParams;
  const filters: BookFilterValues = {
    search: getText(params.search),
    category: getText(params.category),
    available: getText(params.available),
    sort: getText(params.sort),
    page: getText(params.page),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">The library</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">All Books</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Every book shared by the BookNook community. Search, filter by shelf, or show only what is available now.
        </p>
      </div>

      <BookFilters filters={filters} />

      <Suspense key={JSON.stringify(filters)} fallback={<div className="mt-8"><BookGridSkeleton count={9} /></div>}>
        <BookResults filters={filters} />
      </Suspense>
    </div>
  );
};

export default AllBooksPage;
