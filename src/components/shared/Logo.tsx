import Link from "next/link";
import { BookOpen } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
        <BookOpen className="size-5" />
      </span>
      <span className="text-2xl font-bold">
        Book<span className="text-primary">Nook</span>
      </span>
    </Link>
  );
};

export default Logo;
