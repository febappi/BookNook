import Link from "next/link";
import { SearchX } from "lucide-react";
import BookCard from "@/components/shared/BookCard";
import Reveal from "@/components/shared/Reveal";
import BookPagination from "./BookPagination";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { getFilterQuery } from "@/lib/filters";
import { BookFilterValues, BooksResponse } from "@/lib/types";

const BOOKS_PER_PAGE = 9;

const BookResults = async ({ filters }: { filters: BookFilterValues }) => {
  const query = getFilterQuery(filters);
  query.set("limit", String(BOOKS_PER_PAGE));

  let data: BooksResponse | null = null;
  try {
    data = await apiFetch(`/books?${query}`, { cache: "no-store" });
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <p className="mt-8 rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Could not load the books right now. Please try again later.
      </p>
    );
  }

  if (data.books.length === 0) {
    const hasFilters = Object.values(filters).some((value) => value);
    return (
      <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-16 text-center">
        <SearchX className="size-12 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">No books found</h2>
          <p className="mt-2 text-muted-foreground">
            {hasFilters ? "Try another search or clear the filters." : "No one has added a book yet."}
          </p>
        </div>
        <Link href={hasFilters ? "/books" : "/add-book"} className={buttonVariants()}>
          {hasFilters ? "Clear filters" : "Add a Book"}
        </Link>
      </div>
    );
  }

  const firstBookNumber = (data.page - 1) * BOOKS_PER_PAGE + 1;
  const lastBookNumber = firstBookNumber + data.books.length - 1;

  return (
    <>
      <p className="mt-8 mb-5 text-sm text-muted-foreground">
        Showing {firstBookNumber} to {lastBookNumber} of {data.total} {data.total === 1 ? "book" : "books"}
      </p>
      <div className="grid grid-cols-1 border-t border-l border-ink sm:grid-cols-2 lg:grid-cols-3">
        {data.books.map((book, index) => (
          <Reveal key={book._id} delay={(index % 3) * 0.1} className="h-full border-r border-b border-ink">
            <BookCard book={book} />
          </Reveal>
        ))}
      </div>
      <BookPagination filters={filters} currentPage={data.page} totalPages={data.totalPages} />
    </>
  );
};

export default BookResults;
