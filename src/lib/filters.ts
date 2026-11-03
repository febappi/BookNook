import { BookFilterValues } from "./types";

export const getFilterQuery = (filters: BookFilterValues) => {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });
  return query;
};

export const getBooksLink = (filters: BookFilterValues) => {
  const queryString = getFilterQuery(filters).toString();
  return queryString ? `/books?${queryString}` : "/books";
};
