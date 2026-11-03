import Link from "next/link";
import { ArrowRight, BookPlus } from "lucide-react";
import BookCard from "@/components/shared/BookCard";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
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
        We could not load the newest books right now. Please refresh the page in a moment.
      </p>
    );
  }

  if (data.books.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-14 text-center">
        <BookPlus className="size-10 text-primary" />
        <div>
          <h3 className="text-2xl">The shelves are still empty</h3>
          <p className="mt-2 text-muted-foreground">Be the first reader to share a book with the library.</p>
        </div>
        <Link href="/add-book" className={buttonVariants()}>
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="/books" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          See All Books
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>
    </>
  );
};

export default NewArrivals;
