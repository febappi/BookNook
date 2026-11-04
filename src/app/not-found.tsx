import type { Metadata } from "next";
import Link from "next/link";
import { BookX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <BookX className="size-10" />
      </div>
      <h1 className="mt-6 text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-3 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 max-w-md text-gray-500">
        Sorry, the page you are looking for does not exist on BookNook. It may have been moved or deleted.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg", className: "mt-8" })}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
