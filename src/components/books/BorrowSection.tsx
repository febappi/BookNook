"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { apiFetch } from "@/lib/api";
import { getAuthHeaders } from "@/lib/auth-client";
import { Book, SessionUser } from "@/lib/types";

const BorrowSection = ({ book, user }: { book: Book; user: SessionUser }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmBorrow = async () => {
    setLoading(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        headers: await getAuthHeaders(),
        body: JSON.stringify({ bookId: book._id }),
      });
      toast.add({ title: "Book borrowed successfully. Enjoy reading!", type: "success" });
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.add({ title: error instanceof Error ? error.message : "Could not borrow this book", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (book.isBorrowedByMe) {
    return (
      <div className="space-y-3">
        <p className="rounded-lg bg-accent px-4 py-3 text-sm text-primary">
          You have already borrowed this book. You can return it from{" "}
          <Link href="/my-borrows" className="font-semibold underline">
            My Borrows
          </Link>
          .
        </p>
        <Button size="lg" disabled className="w-full sm:w-auto">
          Already Borrowed
        </Button>
      </div>
    );
  }

  if (book.availableCopies === 0) {
    return (
      <Button size="lg" variant="secondary" disabled className="w-full sm:w-auto">
        Not Available
      </Button>
    );
  }

  return (
    <>
      <Button size="lg" className="w-full sm:w-auto" onClick={() => setOpen(true)}>
        Borrow This Book
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow &quot;{book.title}&quot;</DialogTitle>
            <DialogDescription>You can keep this book for 7 days. Please confirm your details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="borrow-name">Name</Label>
              <Input id="borrow-name" value={user.name} readOnly className="bg-muted/60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borrow-email">Email</Label>
              <Input id="borrow-email" value={user.email} readOnly className="bg-muted/60" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" disabled={loading} />}>Cancel</DialogClose>
            <Button onClick={handleConfirmBorrow} disabled={loading}>
              {loading && <Spinner />}
              Confirm Borrow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BorrowSection;
