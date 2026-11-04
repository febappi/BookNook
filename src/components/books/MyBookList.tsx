"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import BookForm from "./BookForm";
import CategoryBadge from "@/components/shared/CategoryBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { apiFetch } from "@/lib/api";
import { getAuthHeaders } from "@/lib/auth-client";
import { Book, BookInput, SessionUser } from "@/lib/types";

const MyBookList = ({ books, user }: { books: Book[]; user: SessionUser }) => {
  const router = useRouter();
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdateBook = async (bookData: BookInput) => {
    if (!editingBook) {
      return;
    }
    await apiFetch(`/books/${editingBook._id}`, {
      method: "PATCH",
      headers: await getAuthHeaders(),
      body: JSON.stringify(bookData),
    });
    toast.add({ title: "Book updated successfully", type: "success" });
    setEditingBook(null);
    router.refresh();
  };

  const handleDeleteBook = async () => {
    if (!deletingBook) {
      return;
    }
    setIsDeleting(true);
    try {
      await apiFetch(`/books/${deletingBook._id}`, {
        method: "DELETE",
        headers: await getAuthHeaders(),
      });
      toast.add({ title: "Book deleted successfully", type: "success" });
      setDeletingBook(null);
      router.refresh();
    } catch (error) {
      toast.add({ title: error instanceof Error ? error.message : "Could not delete this book", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book._id} className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-20">
              <Image src={book.image} alt={book.title} fill sizes="(min-width: 640px) 80px, 100vw" className="object-contain p-1" />
            </div>

            <div className="min-w-0 flex-1">
              <CategoryBadge category={book.category} />
              <h2 className="mt-2 truncate text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">by {book.author}</p>
              <p className="mt-1 text-sm text-gray-500">
                <span className={book.availableCopies > 0 ? "font-medium text-primary" : "font-medium text-red-500"}>
                  {book.availableCopies} of {book.totalCopies}
                </span>{" "}
                copies available
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex">
              <Link href={`/books/${book._id}`} className={buttonVariants({ variant: "outline" })}>
                <Eye />
                View
              </Link>
              <Button variant="outline" onClick={() => setEditingBook(book)}>
                <Pencil />
                Edit
              </Button>
              <Button variant="destructive" onClick={() => setDeletingBook(book)}>
                <Trash2 />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={Boolean(editingBook)} onOpenChange={(open) => !open && setEditingBook(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {editingBook && (
            <BookForm key={editingBook._id} user={user} book={editingBook} submitLabel="Save Changes" onSubmit={handleUpdateBook} />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deletingBook)}
        onOpenChange={(open) => !open && setDeletingBook(null)}
        title="Delete this book?"
        description={`"${deletingBook?.title}" will be removed from the library. This cannot be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteBook}
      />
    </>
  );
};

export default MyBookList;
