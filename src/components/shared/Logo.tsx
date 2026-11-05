import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
};

const Logo = ({ variant = "light" }: LogoProps) => {
  if (variant === "dark") {
    return (
      <Link href="/" className="inline-block shrink-0">
        <Image src="/Logo.png" alt="BookNook" width={2172} height={724} className="-ml-3 h-16 w-auto max-w-full object-contain object-left" />
      </Link>
    );
  }

  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5">
      <span className="relative size-10 bg-ink">
        <Image src="/icon.png" alt="" fill sizes="40px" className="object-contain p-1" />
      </span>
      <span className="font-display text-xl tracking-tight uppercase">
        Book<span className="text-cobalt">Nook</span>
      </span>
    </Link>
  );
};

export default Logo;
