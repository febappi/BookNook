import type { Metadata } from "next";
import Link from "next/link";
import { BookPlus, Plus } from "lucide-react";
import MyBookList from "@/components/books/MyBookList";
import { buttonVariants } from "@/components/ui/button";
import { requireUser, getServerToken } from "@/lib/session";
import { BooksResponse } from "@/lib/types";

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
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">My Books</h1>
          <p className="mt-1 text-gray-500">Books you have added to the library</p>
        </div>
        <Link href="/add-book" className={buttonVariants()}>
          <Plus />
          Add a Book
        </Link>
      </div>

      {!data && (
        <p className="rounded-2xl border bg-white p-8 text-center text-gray-500">
          Could not load your books right now. Please try again later.
        </p>
      )}

      {data && data.books.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
          <BookPlus className="size-12 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">You have not added any books yet</h2>
            <p className="mt-2 text-gray-500">Add your first book so other readers can borrow it.</p>
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
