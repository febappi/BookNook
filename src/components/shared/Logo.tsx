import Link from "next/link";
import { LibraryBig } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <LibraryBig className="size-5" />
      </span>
      <span className="font-heading text-2xl font-semibold tracking-tight">BookNook</span>
    </Link>
  );
};

export default Logo;
