import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import LoadingSpinner from "../components/LoadingSpinner";
import BookDetails from "../pages/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // HydrateFallback: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allbooks",
        element: <AllBooks />,
      },
      {
        path: '/books/:id',
        element: (

            <PrivateRoute>
                <BookDetails/>
            </PrivateRoute>
        )
      },
      {
        path: "/addbook",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
