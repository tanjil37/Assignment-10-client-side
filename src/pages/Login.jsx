import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef(); //  create ref
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //  login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);

        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please enter a valid email.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many failed attempts. Please try again later.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error(
            "Invalid credentials. Please recheck your email and password."
          );
        } else {
          toast.error(
            error.message || "An unexpected error occurred during login."
          );
        }
      });
  };

  //  google sign-in
  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Google Sign-in successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //forgot password fixed
  // const handleForgetPassword = () => {
  //   const email = emailRef.current.value;
  //   if (!email) {
  //     toast.error("Please enter your email first!");
  //     return;
  //   }

  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       toast.success("Check your email to reset your password");
  //     })
  //     .catch((e) => {
  //       toast.error(e.message);
  //     });
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Login your account
        </h2>

        <form onSubmit={handleLogin} className="card-body">
          {/*  attach ref to input */}
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="input input-bordered"
            placeholder="Email"
            required
          />

          <div className="relative">
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pr-10" // extra padding-right for icon
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600"
              >
                {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            // onClick={handleForgetPassword}
            className="link link-hover text-sm mt-1 text-left text-indigo-600"
          >
            Forgot password?
          </button>

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Login
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignin}
            className="btn bg-white border border-gray-300 w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
              className="w-5 h-5"
            />
            Login with Google
          </button>

          <p className="text-center font-medium mt-3">
            Don’t Have An Account?{" "}
            <Link to="/register" className="text-indigo-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;