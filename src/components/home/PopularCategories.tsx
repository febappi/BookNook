import Link from "next/link";
import { Atom, Baby, BookHeart, Landmark, Library } from "lucide-react";

const categories = [
  { name: "Fiction", description: "Novels and stories", icon: BookHeart },
  { name: "Science", description: "Learn how things work", icon: Atom },
  { name: "History", description: "People and the past", icon: Landmark },
  { name: "Kids", description: "Books for children", icon: Baby },
  { name: "Others", description: "Everything else", icon: Library },
];

const PopularCategories = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Popular Categories</h2>
        <p className="mt-2 text-gray-500">Choose a category to see the books inside it</p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/books?category=${category.name}`}
            className="w-[calc((100%-1rem)/2)] rounded-2xl border bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md sm:p-6 md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
          >
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <category.icon className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
