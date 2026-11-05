import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, Library, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/lib/session";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "My Profile",
};

const MyProfilePage = async () => {
  const user = await requireUser("/my-profile");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <PageHeader label="Account" title="My Profile" />

      <div className="flex flex-col items-center gap-5 rounded-lg border bg-card p-8 text-center sm:flex-row sm:text-left">
        <Avatar className="size-24">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback className="bg-primary text-3xl text-white">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold break-words">{user.name}</h2>
          <p className="mt-1 flex items-center justify-center gap-2 break-all text-muted-foreground sm:justify-start">
            <Mail className="size-4 shrink-0" />
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/my-books" className="flex items-center gap-4 rounded-lg border bg-card p-6 transition hover:border-primary">
          <span className="flex size-12 items-center justify-center bg-primary/10 text-primary">
            <Library className="size-6" />
          </span>
          <div>
            <p className="font-semibold">My Books</p>
            <p className="text-sm text-muted-foreground">Books you have added</p>
          </div>
        </Link>
        <Link href="/my-borrows" className="flex items-center gap-4 rounded-lg border bg-card p-6 transition hover:border-primary">
          <span className="flex size-12 items-center justify-center bg-primary/10 text-primary">
            <BookMarked className="size-6" />
          </span>
          <div>
            <p className="font-semibold">My Borrows</p>
            <p className="text-sm text-muted-foreground">Books you are reading now</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Link href="/books" className={buttonVariants({ variant: "outline" })}>
          Browse More Books
        </Link>
      </div>
    </div>
  );
};

export default MyProfilePage;
