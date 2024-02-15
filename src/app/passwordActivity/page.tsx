"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";

const PasswordPage = () => {
  const [password, setPassword] = useState(""); // store password
  const [showPassword, setShowPassword] = useState(false); // track password visibility

  // function to handle password input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim()); // trim makes it so no whitespace can be added
  };

  // function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // function to calculate password strength
  const calculateStrength = () => {
    let strength = 0;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const minLength = password.length >= 8;

    if (password.match(lowerCaseLetters)) strength += 1;
    if (password.match(upperCaseLetters)) strength += 1;
    if (password.match(numbers)) strength += 1;
    if (minLength) strength += 1;

    return strength;
  };

  const strength = calculateStrength(); // calculate password strength
  const progressWidth = (strength / 4) * 100; // calculate progress width based on strength

  return (
    <main className="font-family: flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      <Nav />
      <div>
        <div className="mx-auto max-w-sm">
          <form>
            <label htmlFor="psw" className="mb-2 block text-lg font-semibold">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on password visibility state
                id="psw"
                name="psw"
                value={password}
                onChange={handleChange}
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:border-[#fc7f7d] focus:outline-none"
                required
              />
              {/* button to make password visible */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="-mt-4 ml-2 rounded-md bg-[#ff6865] px-3 py-2 text-white hover:bg-[#fc7f7d] focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            {/* password criteria */}
            <div
              id="message"
              className="mb-4 rounded-lg bg-white p-4 text-gray-700 shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold">
                Password must contain the following:
              </h3>
              <p
                id="letter"
                className={`p-1 ${password.match(/[a-z]/g) ? "text-green-500" : "text-red-500"}`}
              >
                {password.match(/[a-z]/g) ? "✔" : "✘"} A <b>lowercase</b>{" "}
                letter
              </p>
              <p
                id="capital"
                className={`p-1 ${password.match(/[A-Z]/g) ? "text-green-500" : "text-red-500"}`}
              >
                {password.match(/[A-Z]/g) ? "✔" : "✘"} A{" "}
                <b>capital (uppercase)</b> letter
              </p>
              <p
                id="number"
                className={`p-1 ${password.match(/[0-9]/g) ? "text-green-500" : "text-red-500"}`}
              >
                {password.match(/[0-9]/g) ? "✔" : "✘"} A <b>number</b>
              </p>
              <p
                id="length"
                className={`p-1 ${password.length >= 8 ? "text-green-500" : "text-red-500"}`}
              >
                {password.length >= 8 ? "✔" : "✘"} Minimum <b>8 characters</b>
              </p>
            </div>

            {/* password strength progress bar */}
            <div className="relative mb-4 h-4 overflow-hidden rounded-md border border-gray-300 bg-white">
              <div
                className="absolute left-0 top-0 h-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${progressWidth}%`,
                  background:
                    strength === 4
                      ? "#48bb78" // green
                      : strength > 0
                        ? "linear-gradient(to right, #f56565, #ecc94b)" // red to yellow
                        : "#f56565", // red
                }}
              />
            </div>

            {/* submit button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full rounded-md bg-[#ff6865] px-4 py-2 text-white hover:bg-[#fc7f7d] focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PasswordPage;
