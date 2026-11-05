"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import ScrollTopLink from "./ScrollTopLink";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SessionUser } from "@/lib/types";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

const Navbar = ({ user }: { user: SessionUser | null }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <ScrollTopLink
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors",
                isActive(link.href) ? "bg-ink text-white" : "hover:text-cobalt"
              )}
            >
              {link.label}
            </ScrollTopLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user && <UserMenu user={user} />}
          {!user && (
            <div className="hidden items-center gap-2 lg:flex">
              <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                Login
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Register
              </Link>
            </div>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger
              render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="border-b-2 border-ink">
                <SheetTitle className="font-display text-lg uppercase">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col">
                {links.map((link, index) => (
                  <ScrollTopLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-ink px-5 py-4 text-sm font-semibold tracking-[0.08em] uppercase",
                      isActive(link.href) ? "bg-ink text-white" : "hover:text-cobalt"
                    )}
                  >
                    <span className="text-xs opacity-50">0{index + 1}</span>
                    {link.label}
                  </ScrollTopLink>
                ))}
              </nav>
              {!user && (
                <div className="mt-auto flex flex-col gap-2 border-t-2 border-ink p-5">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className={buttonVariants()}>
                    Register
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
