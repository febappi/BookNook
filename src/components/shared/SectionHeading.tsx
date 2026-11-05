import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  number: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark";
};

const SectionHeading = ({ number, label, title, description, tone = "light" }: SectionHeadingProps) => {
  const isDark = tone === "dark";

  return (
    <div className={cn("grid gap-4 border-t-2 pt-5 md:grid-cols-12", isDark ? "border-white" : "border-ink")}>
      <div className="flex items-baseline gap-3 md:col-span-3 md:flex-col md:gap-1">
        <span className={cn("font-display text-4xl leading-none", isDark ? "text-white" : "text-cobalt")}>{number}</span>
        <span className="text-xs font-semibold tracking-[0.15em] uppercase">{label}</span>
      </div>
      <div className="md:col-span-9">
        <h2 className="text-4xl leading-[0.95] uppercase sm:text-5xl">{title}</h2>
        {description && (
          <p className={cn("mt-4 max-w-xl text-base", isDark ? "text-white/80" : "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
