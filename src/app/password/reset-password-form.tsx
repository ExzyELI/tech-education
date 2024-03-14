"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/init_app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // use state will be used to keep track of the values the user enters in the form
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email);
    toast.success("Email Sent!");
  }

  return (
    <div>
      <title>Tech Education | Sign In</title>
      <div className="flex min-h-screen items-center bg-gradient-to-br from-[#FAF9F6] to-[#FAF9F6] text-[#434343]">
        {/* container */}
        <div className="mx-auto flex w-full max-w-sm rounded-lg bg-white shadow-lg lg:max-w-3xl">
          {/* left column */}
          <div
            className="rounded-l-lg bg-[#e1f3ff] bg-cover object-center lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url("https://i.imgur.com/59W6oS6.png")',
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
            <p className="mt-1 text-center font-medium">Forgot password?</p>

            {/* begin form for resetting password */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} action="#">
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
                    value={email}
                    // event e calls the setEmail function to update our form state
                    // we will return an object with all the old form values
                    // then update the email value e.target.value
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border bg-white px-4 py-2 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                </div>

                {/* reset button */}
                <div>
                  <button
                    type="submit"
                    className="w-full transform rounded-lg bg-[#ffe08d] px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-[#ffe9b0] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50"
                  >
                    Reset
                  </button>
                  <ToastContainer position="top-center" />
                </div>

                <div className="flex flex-col gap-2">
                  {/* link to sign in page */}
                  <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a
                      href="/sign-in"
                      className="font-semibold leading-6 text-[#a8cd87]"
                    >
                      Login
                    </a>
                  </p>

                  {/* link to sign up page */}
                  <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <a
                      href="/sign-up"
                      className="font-semibold leading-6 text-[#ffc21e]"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
