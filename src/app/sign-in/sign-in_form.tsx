import { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "firebase/auth";

export default function Sign_in_form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const res = await signInWithEmailAndPassword(email, password);
      console.log("signed in", { res });

      if (res !== undefined && res.user.emailVerified) {
        router.push("/HomePage");
      }
      if (res !== undefined && !res.user.emailVerified) {
        toast.error("Please check your email and verify to sign in."); // show messages for email verification if the user email is not verified
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <title>Tech Education | Sign In</title>
      <div className="flex h-screen min-h-screen items-center bg-gradient-to-br from-[#FAF9F6] to-[#FAF9F6] text-[#434343]">
        {/* container */}
        <div className="mx-auto flex w-full max-w-sm rounded-lg bg-white shadow-lg lg:max-w-4xl">
          {/* left column */}
          <div
            className="rounded-l-lg bg-cover object-center lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url("https://i.imgur.com/ZmR82c5.jpg")',
            }}
          />
          {/* right column */}
          <div className="relative w-full px-6 py-10 md:px-8 lg:w-1/2">
            <button
              onClick={() => router.push("/")}
              className="absolute left-0 top-0 ml-4 mt-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            </button>
            <p className="mt-3 text-center text-xl font-bold text-[#ff6865]">
              TECH EDUCATION
            </p>
            <p className="mt-2 text-center font-medium">Welcome back!</p>

            {/* begin form for signing in */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSignin}>
                {/* email address slot */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border bg-white px-4 py-2 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                </div>

                {/* password slot */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium"
                    >
                      Password
                    </label>
                    <a
                      href="/password"
                      className="text-xs text-gray-600 hover:text-[#ffcf4f] dark:text-gray-400"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-lg border bg-white px-4 py-2 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    </button>
                  </div>
                </div>

                {/* sign in button */}
                <div>
                  <button
                    type="submit"
                    className="w-full transform rounded-lg bg-[#ffe08d] px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-[#ffe9b0] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50"
                  >
                    Login
                  </button>
                </div>

                {/* link to sign up page */}
                <p className="mt-10 text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <a
                    href="/sign-up"
                    className="font-semibold leading-6 text-[#ffc21e]"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
            <ToastContainer
              className="Toast-position mt-[20px]"
              style={{ width: "450px" }}
              position="top-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
