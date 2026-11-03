"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "./Logo";
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
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-b-2 py-1 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!user && (
            <div className="hidden items-center gap-2 lg:flex">
              <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
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
              <SheetHeader className="border-b">
                <SheetTitle className="font-heading text-xl">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-3 py-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base font-medium",
                      isActive(link.href) ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {!user && (
                <div className="mt-auto flex flex-col gap-2 border-t p-6">
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
