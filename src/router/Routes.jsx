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
import MyBooks from "../pages/MyBooks";

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
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: '/book-details/:id',
        element: (

            <PrivateRoute>
                <BookDetails/>
            </PrivateRoute>
        )
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element:(
          <PrivateRoute>
            <MyBooks/>
          </PrivateRoute>
        )
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
