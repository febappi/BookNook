"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const ErrorPage = ({ reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="flex size-20 items-center justify-center bg-destructive/10 text-destructive">
        <TriangleAlert className="size-10" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-muted-foreground">We could not load this page right now. Please try again.</p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
