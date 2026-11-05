import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { buttonVariants } from "@/components/ui/button";
import { getBookLink } from "@/lib/book-link";
import { cn } from "@/lib/utils";
import { Book } from "@/lib/types";

const pad = (value: number) => String(value).padStart(2, "0");

const BookCard = ({ book }: { book: Book }) => {
  const isAvailable = book.availableCopies > 0;
  const bookLink = getBookLink(book._id, book.title);

  return (
    <article className="group flex h-full flex-col bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge category={book.category} />
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.1em] uppercase tabular-nums",
            isAvailable ? "text-foreground" : "text-destructive"
          )}
        >
          {isAvailable ? `${pad(book.availableCopies)}/${pad(book.totalCopies)} in` : "Not available"}
        </span>
      </div>

      <Link href={bookLink} className="relative mt-4 block h-64 overflow-hidden bg-concrete">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain px-8 py-6 transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="line-clamp-2 min-h-[2lh] font-sans text-lg leading-snug font-bold transition-colors group-hover:text-cobalt">
          {book.title}
        </h3>
        <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">{book.author}</p>
        <Link href={bookLink} className={cn(buttonVariants(), "mt-5 w-full justify-between")}>
          View Details
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>
    </article>
  );
};

export default BookCard;
