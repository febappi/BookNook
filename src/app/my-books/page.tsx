import type { Metadata } from "next";
import Link from "next/link";
import { BookPlus, Plus } from "lucide-react";
import MyBookList from "@/components/books/MyBookList";
import { buttonVariants } from "@/components/ui/button";
import { requireUser, getServerToken } from "@/lib/session";
import { BooksResponse } from "@/lib/types";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "My Books",
};

const MyBooksPage = async () => {
  const user = await requireUser("/my-books");
  const token = await getServerToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?mine=true&limit=50`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data: BooksResponse | null = res.ok ? await res.json() : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <PageHeader label="Your shelf" title="My Books" description="Books you have added to the library.">
        <Link href="/add-book" className={buttonVariants()}>
          <Plus />
          Add a Book
        </Link>
      </PageHeader>

      {!data && (
        <p className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
          Could not load your books right now. Please try again later.
        </p>
      )}

      {data && data.books.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-16 text-center">
          <BookPlus className="size-12 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">You have not added any books yet</h2>
            <p className="mt-2 text-muted-foreground">Add your first book so other readers can borrow it.</p>
          </div>
          <Link href="/add-book" className={buttonVariants()}>
            Add a Book
          </Link>
        </div>
      )}

      {data && data.books.length > 0 && (
        <MyBookList books={data.books} user={{ name: user.name, email: user.email, image: user.image }} />
      )}
    </div>
  );
};

export default MyBooksPage;
