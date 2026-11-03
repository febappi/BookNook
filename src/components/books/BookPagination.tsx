import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getBooksLink } from "@/lib/filters";
import { cn } from "@/lib/utils";
import { BookFilterValues } from "@/lib/types";

type BookPaginationProps = {
  filters: BookFilterValues;
  currentPage: number;
  totalPages: number;
};

const BookPagination = ({ filters, currentPage, totalPages }: BookPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const firstPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const lastPage = Math.min(totalPages, firstPage + 4);
  const pageNumbers = [];
  for (let page = firstPage; page <= lastPage; page++) {
    pageNumbers.push(page);
  }

  const getPageLink = (page: number) => getBooksLink({ ...filters, page: String(page) });

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1.5">
      {currentPage > 1 && (
        <Link href={getPageLink(currentPage - 1)} className={buttonVariants({ variant: "ghost" })}>
          <ChevronLeft />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      )}

      {pageNumbers.map((page) => (
        <Link
          key={page}
          href={getPageLink(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(buttonVariants({ variant: page === currentPage ? "default" : "ghost", size: "icon" }))}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={getPageLink(currentPage + 1)} className={buttonVariants({ variant: "ghost" })}>
          <span className="hidden sm:inline">Next</span>
          <ChevronRight />
        </Link>
      )}
    </nav>
  );
};

export default BookPagination;
