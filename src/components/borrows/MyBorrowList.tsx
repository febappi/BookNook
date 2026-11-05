"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { apiFetch } from "@/lib/api";
import { getAuthHeaders } from "@/lib/auth-client";
import { getBookLink } from "@/lib/book-link";
import { cn } from "@/lib/utils";
import { Borrow } from "@/lib/types";

const ONE_DAY = 24 * 60 * 60 * 1000;

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
};

const getBorrowStatus = (returnDate: string) => {
  const daysLeft = Math.ceil((new Date(returnDate).getTime() - Date.now()) / ONE_DAY);
  if (daysLeft < 0) {
    return { label: "Overdue", className: "bg-destructive text-white" };
  }
  if (daysLeft <= 2) {
    return { label: "Due soon", className: "bg-signal text-ink" };
  }
  return { label: "Borrowed", className: "bg-cobalt text-white" };
};

const StatusBadge = ({ returnDate }: { returnDate: string }) => {
  const status = getBorrowStatus(returnDate);
  return <span className={cn("px-2 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase", status.className)}>{status.label}</span>;
};

const MyBorrowList = ({ borrows }: { borrows: Borrow[] }) => {
  const router = useRouter();
  const [returningBorrow, setReturningBorrow] = useState<Borrow | null>(null);
  const [isReturning, setIsReturning] = useState(false);

  const handleReturnBook = async () => {
    if (!returningBorrow) {
      return;
    }
    setIsReturning(true);
    try {
      await apiFetch(`/borrows/${returningBorrow._id}`, {
        method: "DELETE",
        headers: await getAuthHeaders(),
      });
      toast.add({ title: "Book returned successfully", type: "success" });
      setReturningBorrow(null);
      router.refresh();
    } catch (error) {
      toast.add({ title: error instanceof Error ? error.message : "Could not return this book", type: "error" });
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border bg-card md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead className="px-4 py-3">Book</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="px-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrows.map((borrow) => (
              <TableRow key={borrow._id}>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={borrow.bookImage} alt={borrow.bookTitle} fill sizes="48px" className="object-contain" />
                    </div>
                    <Link href={getBookLink(borrow.bookId, borrow.bookTitle)} className="max-w-xs truncate font-medium hover:text-primary">
                      {borrow.bookTitle}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-foreground/80">{formatDate(borrow.borrowDate)}</TableCell>
                <TableCell className="text-foreground/80">{formatDate(borrow.returnDate)}</TableCell>
                <TableCell>
                  <StatusBadge returnDate={borrow.returnDate} />
                </TableCell>
                <TableCell className="px-4 text-right">
                  <Button variant="outline" onClick={() => setReturningBorrow(borrow)}>
                    <RotateCcw />
                    Return Book
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4 md:hidden">
        {borrows.map((borrow) => (
          <div key={borrow._id} className="rounded-lg border bg-card p-4">
            <div className="flex gap-4">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={borrow.bookImage} alt={borrow.bookTitle} fill sizes="64px" className="object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <Link href={getBookLink(borrow.bookId, borrow.bookTitle)} className="line-clamp-2 font-semibold hover:text-primary">
                  {borrow.bookTitle}
                </Link>
                <div className="mt-2">
                  <StatusBadge returnDate={borrow.returnDate} />
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-muted/60 p-2">
                <p className="text-xs text-muted-foreground">Borrow Date</p>
                <p className="font-medium">{formatDate(borrow.borrowDate)}</p>
              </div>
              <div className="rounded-lg bg-muted/60 p-2">
                <p className="text-xs text-muted-foreground">Return Date</p>
                <p className="font-medium">{formatDate(borrow.returnDate)}</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={() => setReturningBorrow(borrow)}>
              <RotateCcw />
              Return Book
            </Button>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(returningBorrow)}
        onOpenChange={(open) => !open && setReturningBorrow(null)}
        title="Return this book?"
        description={`"${returningBorrow?.bookTitle}" will go back to the library so other readers can borrow it.`}
        confirmLabel="Return Book"
        confirmVariant="default"
        isLoading={isReturning}
        onConfirm={handleReturnBook}
      />
    </>
  );
};

export default MyBorrowList;
