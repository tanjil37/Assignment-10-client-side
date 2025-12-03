# The Book Haven

## Preview Link: https://nimble-croissant-cfd9fb.netlify.app/


## Overview
Welcome to **The Book Haven**, a full-stack digital library web application where book enthusiasts can explore a vast collection of books, add their favorites, manage personal libraries, and engage with a community of readers. Built with React.js for the frontend, Node.js/Express.js for the backend, MongoDB for data storage, and Firebase for secure authentication, this app provides a seamless experience for discovering and curating books. Whether you're a casual reader or a avid collector, The Book Haven is your go-to digital sanctuary.

### Live Site
[Visit The Book Haven]([https://thebookhaven.netlify.app](https://nimble-croissant-cfd9fb.netlify.app/)) <!-- Replace with your actual deployed URL -->

## Key Features
- **Intuitive Navigation & Authentication**: Easily log in/register via email/password or Google, with protected routes for personalized features like adding/updating books. Hover over your profile in the navbar to see your details, and toggle between light/dark themes for a comfortable reading experience.
- **Dynamic Homepage**: Features an animated banner with quick-access buttons, the latest 6 books fetched in real-time from MongoDB, and engaging static sections like "Top Genres" with vibrant images and "Book of the Week" highlights to inspire your next read.
- **Comprehensive Book Management (CRUD)**: Authenticated users can add books with image uploads via ImgBB, view all books in a sortable table (by rating), update/delete their own entries, and access a dedicated "My Books" page for personal organization.
- **Detailed Book Exploration**: Dive into book details with rich summaries, ratings, and user comments that update in real-time. Private routes ensure secure access, with loading spinners for smooth data fetching via Axios.
- **Responsive & User-Friendly Design**: Fully responsive across mobile, tablet, and desktop, with consistent styling (e.g., uniform card heights, balanced spacing), custom 404 error page, and toast notifications for success/error messages using React Hot Toast—no boring alerts here!
- **Advanced Interactions**: Sort books by rating on the All Books page, leave comments on details pages (stored in MongoDB), and enjoy real-time updates for a social feel.

## Tech Stack
- **Frontend**: React.js, React Router, Axios, React Hot Toast, React Tooltip, Tailwind CSS (for custom responsive design inspired by modern book sites).
- **Backend Integration**: Node.js/Express.js API endpoints for CRUD operations.
- **Database**: MongoDB Atlas for storing books, user comments, and metadata.
- **Authentication**: Firebase Auth for secure login/register.
- **Deployment**: Netlify for hosting, ensuring no reload errors on routes.

## Getting Started
### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository: `git clone https://github.com/yourusername/the-book-haven-client.git`
2. Navigate to the project: `cd the-book-haven-client`
3. Install dependencies: `npm install`
4. Set up environment variables in `.env` (e.g., Firebase config, MongoDB URI—copy from server repo).
5. Run the app: `npm start`
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development
- Ensure Firebase is configured with your domain for auth redirects.
- For image uploads, get an ImgBB API key and add to `.env`.
- Test protected routes by logging in via the app.

## GitHub Commits
This project includes 18 notable client-side commits, covering setup, routing, authentication, CRUD components, UI enhancements, and deployment fixes.

## Contributing
Feel free to fork and submit pull requests for features like advanced search or more review options. Always follow the code style and add tests.

## License
This project is open-source under the MIT License. See [LICENSE](LICENSE) for details.

---

*Built with passion for books by [Your Name]. Last updated: November 13, 2025*
