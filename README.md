<div align="center">

# BookNook

### A Small Online Library. Add a book, borrow a book, return a book.

BookNook is a small online library where readers can share the books they own, browse books added by other readers, borrow a book for 7 days and return it when they are done.

**Live Site:** [booknook-febappi.netlify.app](https://booknook-febappi.netlify.app)

<br>

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-1-000000?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## Technologies I Used

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Better Auth with the MongoDB Adapter and the JWT plugin
- Swiper.js for the home page slider
- imgbb for book image hosting
- Lucide icons
- Express.js + MongoDB backend ([BookNook Server](https://github.com/febappi/BookNook_Server))

# Features

1. **Browse the library:** The home page has a Swiper slider, the 6 newest books from the database, a How Borrowing Works section and popular categories. The All Books page shows every book in a 3 column grid with search by title or author, category filter, available-only filter, sorting and pagination.

2. **Login and registration:** Users can register with name, email, photo URL and password, or continue with Google. The password must have an uppercase letter, a lowercase letter and at least 6 characters. Private pages send logged-out users to the login page and bring them back to the same page after login.

3. **Add and manage books:** Logged-in users can add a book with title, author, category, cover image (uploaded to imgbb), short description and total copies. On My Books they can edit their books in a modal or delete them after confirming in a custom dialog. Users can only change their own books.

4. **Borrow and return:** The Book Details page shows the book information, who added it and how many copies are available. Borrow This Book opens a modal with the user's name and email, and Confirm Borrow lowers the available copies by one. My Borrows shows borrowed books in a table with borrow date, return date, status and a Return Book button.

5. **Safe borrowing rules:** A user cannot borrow the same book twice at the same time, books with no copies left show Not Available, and available copies never go below zero. All of this is also checked on the server, which verifies a JWT on every protected request.

6. **Responsive UI with feedback:** Works on mobile, tablet and desktop. Toasts show every success and error, loading spinners and skeletons show while data loads, every page has its own title, and unknown routes show a custom 404 page.

## How to Run

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root before running:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=any_long_random_string
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMGBB_API_KEY=your_imgbb_api_key
```

The backend server must also be running. Then open [http://localhost:3000](http://localhost:3000) in your browser.
