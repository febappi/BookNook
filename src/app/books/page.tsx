import type { Metadata } from "next";
import { Suspense } from "react";
import BookFilters from "@/components/books/BookFilters";
import BookResults from "@/components/books/BookResults";
import BookGridSkeleton from "@/components/shared/BookGridSkeleton";
import { BookFilterValues } from "@/lib/types";
import PageHeader from "@/components/shared/PageHeader";

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
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <PageHeader label="The Library" title="All Books" description="Search the shelves, filter by category and find something good to read." />

      <BookFilters filters={filters} />

      <Suspense key={JSON.stringify(filters)} fallback={<div className="mt-8"><BookGridSkeleton count={9} /></div>}>
        <BookResults filters={filters} />
      </Suspense>
    </div>
  );
};

export default AllBooksPage;
