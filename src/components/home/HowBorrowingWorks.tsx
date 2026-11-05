import { BookOpenCheck, RotateCcw, Search } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const steps = [
  {
    title: "Browse",
    description: "Search books by title or author and open any book to see its details.",
    icon: Search,
  },
  {
    title: "Borrow",
    description: "Click Borrow This Book and confirm. You can keep the book for 7 days.",
    icon: BookOpenCheck,
  },
  {
    title: "Return",
    description: "Return the book from My Borrows so another reader can borrow it.",
    icon: RotateCcw,
  },
];

const HowBorrowingWorks = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold">How Borrowing Works</h2>
          <p className="mt-2 text-gray-500">Borrowing a book from BookNook takes only three steps</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.15} className="h-full">
              <div className="h-full rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="size-7" />
                </div>
                <p className="mt-5 text-sm font-medium text-primary">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-gray-500">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowBorrowingWorks;
