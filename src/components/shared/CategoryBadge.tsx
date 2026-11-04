import { cn } from "@/lib/utils";
import { Category } from "@/lib/types";

const categoryStyles: Record<Category, string> = {
  Fiction: "bg-purple-100 text-purple-700",
  Science: "bg-blue-100 text-blue-700",
  History: "bg-amber-100 text-amber-700",
  Kids: "bg-pink-100 text-pink-700",
  Others: "bg-gray-100 text-gray-700",
};

const CategoryBadge = ({ category }: { category: Category }) => {
  return (
    <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-medium", categoryStyles[category])}>
      {category}
    </span>
  );
};

export default CategoryBadge;
