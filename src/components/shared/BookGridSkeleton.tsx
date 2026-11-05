import { Skeleton } from "@/components/ui/skeleton";

const BookGridSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="grid grid-cols-1 border-t border-l border-ink sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border-r border-b border-ink p-5">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-12" />
          </div>
          <Skeleton className="mt-4 h-64" />
          <div className="space-y-3 pt-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGridSkeleton;
