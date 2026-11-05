import Link from "next/link";
import { ArrowRight, BookPlus } from "lucide-react";
import BookCard from "@/components/shared/BookCard";
import Reveal from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { BooksResponse } from "@/lib/types";

const NewArrivals = async () => {
  let data: BooksResponse | null = null;
  try {
    data = await apiFetch("/books?limit=6&sort=newest", { cache: "no-store" });
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <p className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Could not load the books right now. Please try again later.
      </p>
    );
  }

  if (data.books.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-14 text-center">
        <BookPlus className="size-12 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">No books added yet</h3>
          <p className="mt-2 text-muted-foreground">Be the first one to add a book to the library.</p>
        </div>
        <Link href="/add-book" className={buttonVariants()}>
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 border-t border-l border-ink sm:grid-cols-2 lg:grid-cols-3">
        {data.books.map((book, index) => (
          <Reveal key={book._id} delay={(index % 3) * 0.1} className="h-full border-r border-b border-ink">
            <BookCard book={book} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 flex justify-end">
        <Link href="/books" className={buttonVariants({ size: "lg" })}>
          See All Books
          <ArrowRight data-icon="inline-end" />
        </Link>
      </Reveal>
    </>
  );
};

export default NewArrivals;
