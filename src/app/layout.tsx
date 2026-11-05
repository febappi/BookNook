import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toast";
import { getSessionUser } from "@/lib/session";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-face",
});

export const metadata: Metadata = {
  title: {
    default: "BookNook | Home",
    template: "BookNook | %s",
  },
  description: "BookNook is a small online library. Add a book, borrow a book, return a book.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getSessionUser();

  return (
    <html lang="en" className={cn("h-full antialiased font-sans", archivo.variable, archivoBlack.variable)}>
      <body className="min-h-full flex flex-col">
        <Navbar user={user} />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
