import { cn } from "@/lib/utils";
import { Category } from "@/lib/types";

const categoryStyles: Record<Category, string> = {
  Fiction: "bg-[#e3ece1] text-[#2f5d46]",
  Science: "bg-[#e1e9ef] text-[#2e5269]",
  History: "bg-[#f1e5d3] text-[#7a5230]",
  Kids: "bg-[#f6e2dd] text-[#8e4a40]",
  Others: "bg-[#ebe8e1] text-[#55534c]",
};

const CategoryBadge = ({ category }: { category: Category }) => {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
        categoryStyles[category]
      )}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
