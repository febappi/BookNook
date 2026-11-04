import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-32 text-gray-500">
      <Spinner className="size-8 text-primary" />
      <p className="text-sm">Loading...</p>
    </div>
  );
};

export default Loading;
