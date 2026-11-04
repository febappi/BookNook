import { Skeleton } from "@/components/ui/skeleton";

const BookGridSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <Skeleton className="h-64 rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGridSkeleton;
