import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import MyBorrowList from "@/components/borrows/MyBorrowList";
import { buttonVariants } from "@/components/ui/button";
import { requireUser, getServerToken } from "@/lib/session";
import { Borrow } from "@/lib/types";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "My Borrows",
};

const MyBorrowsPage = async () => {
  await requireUser("/my-borrows");
  const token = await getServerToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  const borrows: Borrow[] | null = res.ok ? await res.json() : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <PageHeader label="On loan" title="My Borrows" description="Books you have borrowed. Please return them before the return date." />

      {!borrows && (
        <p className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
          Could not load your borrowed books right now. Please try again later.
        </p>
      )}

      {borrows && borrows.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-16 text-center">
          <BookOpen className="size-12 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">You have not borrowed any books</h2>
            <p className="mt-2 text-muted-foreground">Find a book you like and borrow it for 7 days.</p>
          </div>
          <Link href="/books" className={buttonVariants()}>
            Browse Books
          </Link>
        </div>
      )}

      {borrows && borrows.length > 0 && <MyBorrowList borrows={borrows} />}
    </div>
  );
};

export default MyBorrowsPage;
