import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import MyLink from "./MyLink";
import MyContainer from "./MyContainer";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //theme control

   const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])


  const handleTheme = (checked) => {
    setTheme(checked ? "dark": "light")
  }

  //Track logged-in user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((e) => toast.error(e.message));
  };

  const links = (
    <>
      <li>
        <MyLink to={"/"}>Home</MyLink>
      </li>
      <li>
        <MyLink to={"/all-books"}>All Books</MyLink>
      </li>
      <li>
        <MyLink to={"/add-book"}>Add Book</MyLink>
      </li>
      <li>
        <MyLink to={"/my-books"}>My Books</MyLink>
      </li>
      
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <MyContainer className="navbar">
        {/* Left Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700"
          >
             TheBookHaven
          </Link>
        </div>

        {/* Center Section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>




        {/* Right Section */}
        <div className="navbar-end space-x-3">
          <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>
         
         
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-emerald-400 ring-offset-2">
                  <img
                    alt="User avatar"
                    src={user?.photoURL || "https://i.ibb.co.com/4z2Z9xx/hero-6.jpg"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="text-center font-semibold text-gray-700">
                  {user?.displayName || "Anonymous User"}
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-active btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;

