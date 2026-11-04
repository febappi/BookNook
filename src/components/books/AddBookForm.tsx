"use client";

import { useRouter } from "next/navigation";
import BookForm from "./BookForm";
import { toast } from "@/components/ui/toast";
import { apiFetch } from "@/lib/api";
import { getAuthHeaders } from "@/lib/auth-client";
import { BookInput, SessionUser } from "@/lib/types";

const AddBookForm = ({ user }: { user: SessionUser }) => {
  const router = useRouter();

  const handleAddBook = async (bookData: BookInput) => {
    await apiFetch("/books", {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify(bookData),
    });
    toast.add({ title: "Book added successfully", type: "success" });
    router.push("/my-books");
    router.refresh();
  };

  return <BookForm user={user} submitLabel="Add Book" onSubmit={handleAddBook} />;
};

export default AddBookForm;
