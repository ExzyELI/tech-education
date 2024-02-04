"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/init_app";

{
  /* use state will be used to keep track of the values the user enters in the form */
}
export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    await sendPasswordResetEmail(auth, email);
  }
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <a
        href="#"
        className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="mr-2 h-8 w-8"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div className="w-full rounded-lg bg-white p-6 shadow sm:max-w-md sm:p-8 md:mt-0 dark:border dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
          action="#"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@company.com"
              value={email}
              // event e calls the setForm function to update our form state
              // we will return an object with all the old form values
              // then update the email value e.target.value
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="newsletter"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Reset passwod
          </button>
        </form>
      </div>
    </div>
  );
}
