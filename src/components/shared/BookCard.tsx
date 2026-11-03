import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Book } from "@/lib/types";

const BookCard = ({ book }: { book: Book }) => {
  const isAvailable = book.availableCopies > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
      <div className="relative h-72 bg-secondary">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 drop-shadow-lg"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t p-5">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={book.category} />
          <span className={cn("text-xs font-medium", isAvailable ? "text-primary" : "text-destructive")}>
            {isAvailable ? `${book.availableCopies} available` : "Not available"}
          </span>
        </div>
        <div>
          <h3 className="line-clamp-2 min-h-[2lh] text-xl leading-snug">{book.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>
        </div>
        <Link
          href={`/books/${book._id}`}
          className={cn(buttonVariants({ variant: "outline" }), "mt-auto w-full")}
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default BookCard;
