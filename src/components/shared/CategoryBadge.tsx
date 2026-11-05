import { Category } from "@/lib/types";

const categoryCodes: Record<Category, string> = {
  Fiction: "FIC",
  Science: "SCI",
  History: "HIS",
  Kids: "KID",
  Others: "OTH",
};

const CategoryBadge = ({ category }: { category: Category }) => {
  return (
    <span className="inline-flex w-fit items-stretch border border-ink text-[11px] font-semibold tracking-[0.1em] uppercase">
      <span className="bg-ink px-1.5 py-0.5 text-white">{categoryCodes[category]}</span>
      <span className="px-1.5 py-0.5">{category}</span>
    </span>
  );
};

export default CategoryBadge;
