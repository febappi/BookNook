export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
      <h1 className="text-4xl text-primary sm:text-5xl">BookNook</h1>
      <p className="max-w-md text-muted-foreground">
        Add a book, borrow a book, return a book.
      </p>
    </main>
  );
}
