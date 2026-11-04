const ID_LENGTH = 24;

export const getBookLink = (id: string, title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `/books/${slug}-${id}` : `/books/${id}`;
};

export const getBookIdFromSlug = (slug: string) => slug.slice(-ID_LENGTH);
