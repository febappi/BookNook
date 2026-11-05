import type { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BorrowSection from "@/components/books/BorrowSection";
import CategoryBadge from "@/components/shared/CategoryBadge";
import { getBookIdFromSlug } from "@/lib/book-link";
import { getSessionUser, requireUser, getServerToken } from "@/lib/session";
import { Book } from "@/lib/types";

const loadBook = cache(async (id: string) => {
  const token = await getServerToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  const book: Book | null = res.ok ? await res.json() : null;
  return { status: res.status, book };
});

export const generateMetadata = async ({ params }: PageProps<"/books/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const user = await getSessionUser();
  if (!user) {
    return { title: "Book Details" };
  }
  const { book } = await loadBook(getBookIdFromSlug(slug));
  return { title: book ? book.title : "Book Details" };
};

const BookDetailsPage = async ({ params }: PageProps<"/books/[slug]">) => {
  const { slug } = await params;
  const user = await requireUser(`/books/${slug}`);
  const { status, book } = await loadBook(getBookIdFromSlug(slug));

  if (status === 400 || status === 404) {
    notFound();
  }

  if (!book) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <p className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
          Could not load this book right now. Please try again later.
        </p>
      </div>
    );
  }

  const borrowedCopies = book.totalCopies - book.availableCopies;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Link href="/books" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" />
        Back to All Books
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
        <div className="relative h-96 overflow-hidden rounded-lg bg-muted md:h-[480px]">
          <Image
            src={book.image}
            alt={book.title}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-contain p-6"
          />
        </div>

        <div>
          <CategoryBadge category={book.category} />
          <h1 className="mt-4 text-4xl leading-[0.95] uppercase sm:text-5xl">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>

          <p className="mt-6 leading-relaxed whitespace-pre-line text-foreground/80">{book.description}</p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-muted/60 p-4 text-center">
              <p className="text-2xl font-bold">{book.totalCopies}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Total Copies</p>
            </div>
            <div className="rounded-xl bg-accent p-4 text-center">
              <p className="text-2xl font-bold text-primary">{book.availableCopies}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Available</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-4 text-center">
              <p className="text-2xl font-bold">{borrowedCopies}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Borrowed</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border p-4 text-sm">
            <p className="text-muted-foreground">Added by</p>
            <p className="mt-1 font-medium">{book.addedByName}</p>
            <p className="break-all text-muted-foreground">{book.addedByEmail}</p>
          </div>

          <div className="mt-8">
            <BorrowSection book={book} user={{ name: user.name, email: user.email, image: user.image }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
