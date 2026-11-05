import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    title: "Find",
    description: "Search by title or author, or browse a category. Open any book to see its details and who shared it.",
  },
  {
    title: "Borrow",
    description: "Click Borrow This Book, check your name and email, and confirm. The book is yours for 7 days.",
  },
  {
    title: "Return",
    description: "When you finish, return it from My Borrows so the copy goes back on the shelf for the next reader.",
  },
];

const HowBorrowingWorks = () => {
  return (
    <section className="bg-cobalt text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <SectionHeading tone="dark" number="02" label="How it works" title="Three steps. That's it." />
        </Reveal>

        <ol className="mt-12 grid border-t border-white/40 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.12}
              className="h-full border-b border-white/40 md:border-r md:border-b-0 md:last:border-r-0"
            >
              <li className="flex h-full flex-col py-8 md:px-8 md:first:pl-0">
                <span className="font-display text-[5.5rem] leading-none tracking-tighter">0{index + 1}</span>
                <h3 className="mt-6 text-2xl uppercase">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-white/80">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowBorrowingWorks;
