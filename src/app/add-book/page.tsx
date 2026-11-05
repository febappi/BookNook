import type { Metadata } from "next";
import AddBookForm from "@/components/books/AddBookForm";
import { requireUser } from "@/lib/session";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Add Book",
};

const AddBookPage = async () => {
  const user = await requireUser("/add-book");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <PageHeader label="Share" title="Add a Book" description="Put one of your books on the shelf so other readers can borrow it." />
      <div className="rounded-lg border bg-card p-6 sm:p-8">
        <AddBookForm user={{ name: user.name, email: user.email, image: user.image }} />
      </div>
    </div>
  );
};

export default AddBookPage;
