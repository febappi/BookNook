import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { buttonVariants } from "@/components/ui/button";
import { getBookLink } from "@/lib/book-link";
import { cn } from "@/lib/utils";
import { Book } from "@/lib/types";

const BookCard = ({ book }: { book: Book }) => {
  const isAvailable = book.availableCopies > 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-64 bg-gray-100">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={book.category} />
          <span className={cn("text-xs font-medium", isAvailable ? "text-primary" : "text-red-500")}>
            {isAvailable ? `${book.availableCopies} available` : "Not available"}
          </span>
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-[2lh] text-lg font-semibold">{book.title}</h3>
        <p className="mt-1 text-sm text-gray-500">by {book.author}</p>
        <Link href={getBookLink(book._id, book.title)} className={cn(buttonVariants(), "mt-5 w-full")}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
