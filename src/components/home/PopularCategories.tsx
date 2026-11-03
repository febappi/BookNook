import Link from "next/link";
import { ArrowUpRight, Atom, Feather, Landmark, Library, Rabbit } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Fiction",
    description: "Novels and short stories to get lost in, from timeless classics to new voices.",
    icon: Feather,
    style: "bg-[#e3ece1] text-[#2f5d46] sm:col-span-2 lg:row-span-2",
  },
  {
    name: "Science",
    description: "Big ideas explained clearly.",
    icon: Atom,
    style: "bg-[#e1e9ef] text-[#2e5269]",
  },
  {
    name: "History",
    description: "Stories of people and places.",
    icon: Landmark,
    style: "bg-[#f1e5d3] text-[#7a5230]",
  },
  {
    name: "Kids",
    description: "Picture books and first chapters.",
    icon: Rabbit,
    style: "bg-[#f6e2dd] text-[#8e4a40]",
  },
  {
    name: "Others",
    description: "Poetry, self help and more.",
    icon: Library,
    style: "bg-[#ebe8e1] text-[#55534c]",
  },
];

const PopularCategories = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Popular categories</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Find a shelf that suits you</h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Every book in BookNook sits on one of five shelves. Pick one to see what readers have shared.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/books?category=${category.name}`}
            className={cn(
              "group flex min-h-48 flex-col justify-between rounded-lg p-6 transition-transform hover:-translate-y-1",
              category.style
            )}
          >
            <div className="flex items-start justify-between">
              <category.icon className="size-8" />
              <ArrowUpRight className="size-5 opacity-60 transition-opacity group-hover:opacity-100" />
            </div>
            <div>
              <h3 className="text-3xl">{category.name}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed opacity-80">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
