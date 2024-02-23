"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  increment,
} from "firebase/firestore";

const PasswordPage = () => {
  const [password, setPassword] = useState(""); // store password
  const [showPassword, setShowPassword] = useState(false); // track password visibility
  const [user, setUser] = useState<User | null>(null); // store logged in user
  const [score, setScore] = useState<number | null>(null); // store user's score
  const [isGameStarted, setIsGameStarted] = useState(false); // store game start state
  const [attempts, setAttempts] = useState(0); // store attempts
  const [startTime, setStartTime] = useState<Date | null>(null); // store start time
  const [elapsedTime, setElapsedTime] = useState<number | null>(null); // store elapsed time
  const timerRef = useRef<number | null>(null); // timer reference

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // update the user state when auth state changes
    });

    return () => unsubscribe();
  }, []);

  // function to start timer
  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setElapsedTime((prevElapsedTime) =>
        prevElapsedTime !== null ? prevElapsedTime + 1 : 1,
      );
    }, 1000);
  };

  // function to stop timer
  const stopTimer = () => {
    clearInterval(timerRef.current as number); // stops the timer
  };

  // function to start game
  const handleStart = () => {
    setIsGameStarted(true);
    setStartTime(new Date()); // timer begins when game starts
    setElapsedTime(null);
    startTimer();
  };

  // function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stopTimer();
    const endTime = new Date();
    const elapsedMilliseconds = startTime
      ? endTime.getTime() - startTime.getTime()
      : 0; // calculate elapsed time
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000); // converting elapsed time to seconds
    setElapsedTime(elapsedSeconds); // storing elapsed time
    setIsGameStarted(false);

    // calculate score
    const calculatedScore = calculateStrength();

    setScore(calculatedScore); // update score state
    setPassword(""); // reset password field

    const firestore = getFirestore();
    // get current number of attempts from firestore
    if (user) {
      const userDocRef = doc(firestore, `users/${user.uid}`);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentAttempts = userData?.attempts || 0; // 0 if no attempts found
        // update attempts locally
        setAttempts(currentAttempts + 1);
        // update attempts to firestore
        await setDoc(userDocRef, { attempts: increment(1) }, { merge: true });
        // save activity data in firestore
        await addDoc(collection(firestore, `users/${user.uid}/activities`), {
          activityName: "Password Activity",
          score: calculatedScore,
          attempts: currentAttempts + 1,
          timestamp: new Date(),
        });
      }
    }
  };

  // function to format time
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  // function to calculate password strength
  const calculateStrength = (): number => {
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="psw" className="mb-2 block text-lg font-semibold">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"} // shows or hides password
                id="psw"
                name="psw"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())} // trim makes it so no whitespace can be added
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:border-[#fc7f7d] focus:outline-none"
                required
                disabled={!isGameStarted} // disable password field until the user clicks start
              />
              {/* button to make password visible */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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
                {password.length >= 8 ? "✔" : "✘"} At least <b>8 characters</b>
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

            {/* start and submit buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleStart}
                className={`w-full rounded-md bg-[#ff6865] px-4 py-2 text-white hover:bg-[#fc7f7d] focus:outline-none ${
                  isGameStarted ? "hidden" : ""
                }`}
              >
                Start
              </button>
              <button
                type="submit"
                className={`w-full rounded-md bg-[#ff6865] px-4 py-2 text-white hover:bg-[#fc7f7d] focus:outline-none ${
                  !isGameStarted ? "hidden" : ""
                }`}
              >
                Submit
              </button>
            </div>

            {/* score box */}
            <div className="mt-4 flex justify-center">
              <div className="mr-4 flex h-32 w-32 flex-col items-center justify-center rounded-lg bg-red-500 text-2xl font-bold text-white">
                <div className="mb-2 text-sm">Score</div>
                <div>{score !== null ? score : "N/A"}</div>
              </div>
              <div className="mr-4 flex h-32 w-32 flex-col items-center justify-center rounded-lg bg-blue-500 text-2xl font-bold text-white">
                <div className="mb-2 text-sm">Time</div>
                <div>
                  {elapsedTime !== null ? formatTime(elapsedTime) : "0h 0m 0s"}
                </div>
              </div>
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-lg bg-green-500 text-2xl font-bold text-white">
                <div className="mb-2 text-sm">Attempts</div>
                <div>{attempts}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PasswordPage;
