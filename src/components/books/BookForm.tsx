"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { categories } from "@/lib/categories";
import { uploadImage } from "@/lib/upload";
import { Book, BookInput, Category, SessionUser } from "@/lib/types";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

type BookFormProps = {
  user: SessionUser;
  book?: Book;
  submitLabel: string;
  onSubmit: (bookData: BookInput) => Promise<void>;
};

type FormErrors = {
  title?: string;
  author?: string;
  category?: string;
  image?: string;
  description?: string;
  totalCopies?: string;
};

const BookForm = ({ user, book, submitLabel, onSubmit }: BookFormProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState(book ? book.image : "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(book ? book.image : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title")).trim();
    const author = String(formData.get("author")).trim();
    const category = String(formData.get("category"));
    const description = String(formData.get("description")).trim();
    const totalCopies = Number(formData.get("totalCopies"));
    const imageFile = formData.get("image") as File;
    const hasNewImage = imageFile && imageFile.size > 0;

    const newErrors: FormErrors = {};
    if (!title) {
      newErrors.title = "Book title is required";
    }
    if (!author) {
      newErrors.author = "Author name is required";
    }
    if (!categories.includes(category as Category)) {
      newErrors.category = "Please select a category";
    }
    if (!hasNewImage && !book) {
      newErrors.image = "Please choose a book image";
    }
    if (hasNewImage && !imageFile.type.startsWith("image/")) {
      newErrors.image = "Only image files are allowed";
    }
    if (hasNewImage && imageFile.size > MAX_IMAGE_SIZE) {
      newErrors.image = "Image must be smaller than 5 MB";
    }
    if (!description) {
      newErrors.description = "Short description is required";
    }
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      newErrors.totalCopies = "Total copies must be a positive whole number";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      let image = book ? book.image : "";
      if (hasNewImage) {
        image = await uploadImage(imageFile);
      }
      await onSubmit({ title, author, category: category as Category, image, description, totalCopies });
    } catch (error) {
      toast.add({ title: error instanceof Error ? error.message : "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post" noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input id="title" name="title" defaultValue={book?.title} placeholder="e.g. The Silent River" aria-invalid={Boolean(errors.title)} />
          {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input id="author" name="author" defaultValue={book?.author} placeholder="e.g. Amara Hossain" aria-invalid={Boolean(errors.author)} />
          {errors.author && <p className="text-sm text-red-600">{errors.author}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <NativeSelect id="category" name="category" defaultValue={book?.category || ""} className="w-full" aria-invalid={Boolean(errors.category)}>
            <NativeSelectOption value="" disabled>
              Select a category
            </NativeSelectOption>
            {categories.map((category) => (
              <NativeSelectOption key={category} value={category}>
                {category}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalCopies">Total Copies</Label>
          <Input id="totalCopies" name="totalCopies" type="number" min={1} step={1} defaultValue={book?.totalCopies ?? 1} aria-invalid={Boolean(errors.totalCopies)} />
          {errors.totalCopies && <p className="text-sm text-red-600">{errors.totalCopies}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Book Image</Label>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex h-36 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-100 text-gray-400">
            {imagePreview ? (
              <Image src={imagePreview} alt="Book cover preview" fill sizes="112px" className="object-contain p-1" />
            ) : (
              <ImageUp className="size-8" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} aria-invalid={Boolean(errors.image)} />
            <p className="text-xs text-gray-500">
              {book ? "Choose a new image only if you want to replace the current one. " : ""}JPG or PNG, up to 5 MB.
            </p>
            {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea id="description" name="description" defaultValue={book?.description} rows={4} placeholder="What is this book about?" aria-invalid={Boolean(errors.description)} />
        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="userName">User Name</Label>
          <Input id="userName" value={user.name} readOnly className="bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userEmail">User Email</Label>
          <Input id="userEmail" value={user.email} readOnly className="bg-gray-50" />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading && <Spinner />}
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};

export default BookForm;
