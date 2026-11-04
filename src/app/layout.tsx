import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toast";
import { getSessionUser } from "@/lib/session";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "BookNook | Home",
    template: "BookNook | %s",
  },
  description: "BookNook is a small online library. Add a book, borrow a book, return a book.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getSessionUser();

  return (
    <html lang="en" className={cn("h-full antialiased font-sans", poppins.variable)}>
      <body className="min-h-full flex flex-col">
        <Navbar user={user} />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
