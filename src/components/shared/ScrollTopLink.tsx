"use client";

import Link from "next/link";

type ScrollTopLinkProps = React.ComponentProps<typeof Link> & {
  href: string;
};

// Next.js ignores a click on a link to the page you are already on.
// On the same page (same path, no filters in the URL) scroll back to the top instead.
const ScrollTopLink = ({ href, onClick, ...props }: ScrollTopLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const isSamePage = window.location.pathname === href && !window.location.search;
    if (isSamePage && !e.defaultPrevented) {
      e.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
};

export default ScrollTopLink;
