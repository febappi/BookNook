import { BookOpenCheck, RotateCcw, Search } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Browse",
    description: "Look through the shelves, search by title or author, and open any book to read its details.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow",
    description: "Press Borrow This Book and confirm. The book is yours for seven days and appears in My Borrows.",
    icon: BookOpenCheck,
  },
  {
    number: "03",
    title: "Return",
    description: "Finished reading? Return it from My Borrows so the copy goes back on the shelf for the next reader.",
    icon: RotateCcw,
  },
];

const HowBorrowingWorks = () => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest uppercase opacity-80">How borrowing works</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Three simple steps, from shelf to reader and back</h2>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-primary-foreground/20">
          {steps.map((step) => (
            <div key={step.number} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <div className="flex items-center justify-between">
                <span className="font-heading text-6xl opacity-40">{step.number}</span>
                <step.icon className="size-8 opacity-90" />
              </div>
              <h3 className="mt-6 text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed opacity-80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowBorrowingWorks;
