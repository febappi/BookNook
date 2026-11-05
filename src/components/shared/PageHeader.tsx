type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const PageHeader = ({ label, title, description, children }: PageHeaderProps) => {
  return (
    <div className="mb-10 flex flex-col justify-between gap-5 border-b-2 border-ink pb-6 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold tracking-[0.15em] text-cobalt uppercase">{label}</p>
        <h1 className="mt-3 text-5xl leading-[0.9] uppercase sm:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
