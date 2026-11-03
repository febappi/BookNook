"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { categories } from "@/lib/categories";
import { getBooksLink } from "@/lib/filters";
import { BookFilterValues } from "@/lib/types";

const BookFilters = ({ filters }: { filters: BookFilterValues }) => {
  const router = useRouter();

  const updateFilters = (changes: Partial<BookFilterValues>) => {
    router.push(getBooksLink({ ...filters, ...changes, page: "" }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateFilters({ search: String(formData.get("search")).trim() });
  };

  return (
    <div className="grid gap-3 rounded-lg border bg-card p-4 lg:grid-cols-[1fr_auto_auto_auto]">
      <form key={filters.search} onSubmit={handleSearch} className="flex gap-2">
        <Input
          name="search"
          defaultValue={filters.search}
          placeholder="Search by title or author"
          aria-label="Search books"
        />
        <Button type="submit" aria-label="Search">
          <Search />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:contents">
        <NativeSelect
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          aria-label="Filter by category"
          className="w-full lg:w-44"
        >
          <NativeSelectOption value="">All categories</NativeSelectOption>
          {categories.map((category) => (
            <NativeSelectOption key={category} value={category}>
              {category}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          value={filters.available}
          onChange={(e) => updateFilters({ available: e.target.value })}
          aria-label="Filter by availability"
          className="w-full lg:w-44"
        >
          <NativeSelectOption value="">All books</NativeSelectOption>
          <NativeSelectOption value="true">Available now</NativeSelectOption>
        </NativeSelect>

        <NativeSelect
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          aria-label="Sort books"
          className="w-full lg:w-44"
        >
          <NativeSelectOption value="">Newest first</NativeSelectOption>
          <NativeSelectOption value="oldest">Oldest first</NativeSelectOption>
          <NativeSelectOption value="title">Title A to Z</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  );
};

export default BookFilters;
