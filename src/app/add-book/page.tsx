import type { Metadata } from "next";
import AddBookForm from "@/components/books/AddBookForm";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Add Book",
};

const AddBookPage = async () => {
  const user = await requireUser("/add-book");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Add a Book</h1>
        <p className="mt-2 text-gray-500">Share a book with the BookNook community</p>
      </div>
      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <AddBookForm user={{ name: user.name, email: user.email, image: user.image }} />
      </div>
    </div>
  );
};

export default AddBookPage;
