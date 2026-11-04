export type Category = "Fiction" | "Science" | "History" | "Kids" | "Others";

export type Book = {
  _id: string;
  title: string;
  author: string;
  category: Category;
  image: string;
  description: string;
  addedByName: string;
  addedByEmail: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  isBorrowedByMe?: boolean;
};

export type BookInput = {
  title: string;
  author: string;
  category: Category;
  image: string;
  description: string;
  totalCopies: number;
};

export type BooksResponse = {
  books: Book[];
  total: number;
  page: number;
  totalPages: number;
};

export type BookFilterValues = {
  search: string;
  category: string;
  available: string;
  sort: string;
  page: string;
};

export type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  userName: string;
  borrowDate: string;
  returnDate: string;
};

export type SessionUser = {
  name: string;
  email: string;
  image?: string | null;
};
