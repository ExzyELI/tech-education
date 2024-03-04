"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  setDoc,
  increment,
  doc,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import Stats from "../../../comps/stats";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PasswordPage = () => {
  const [password, setPassword] = useState(""); // store password
  const [showPassword, setShowPassword] = useState(false); // track password visibility
  const [user, setUser] = useState<User | null>(null); // store logged in user
  const [score, setScore] = useState<number | null>(null); // store user's score
  const [isGameStarted, setIsGameStarted] = useState(false); // store game start state
  const [password1_attempts, setAttempts] = useState(0); // store attempts
  const [startTime, setStartTime] = useState<Date | null>(null); // store start time
  const [elapsedTime, setElapsedTime] = useState<number>(0); // store elapsed time
  const timerRef = useRef<number | null>(null); // timer reference
  const [showSubmit, setShowSubmit] = useState(false); // submit button visibility

  useEffect(() => {
    handleStart();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // update the user state when auth state changes
      if (user) {
        // get most recent user activity
        getRecentActivity(user.uid);
      }
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
    setElapsedTime(0);
    startTimer();
    // attempts counter
    setAttempts((prevAttempts) => prevAttempts + 1);
    setShowSubmit(true); // submit button is visible when game starts
  };

  // function to get most recent activity that is in firestore
  const getRecentActivity = async (userId: string) => {
    const firestore = getFirestore();
    const activityQuery = query(
      collection(firestore, `users/${userId}/activities`),
      orderBy("timestamp", "desc"),
      limit(1),
    );
    const querySnapshot = await getDocs(activityQuery);
    if (!querySnapshot.empty) {
      const activityData = querySnapshot.docs[0].data();
      setScore(activityData.score);
      setAttempts(activityData.password1_attempts);
      setElapsedTime(activityData.elapsedTime);
    }
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
        const currentAttempts = userData?.password1_attempts || 0; // 0 if no attempts found
        // update attempts locally
        setAttempts(currentAttempts + 1);
        // update attempts to firestore
        await setDoc(userDocRef, { password1_attempts: increment(1) }, { merge: true });
        // save activity data in firestore
        await addDoc(collection(firestore, `users/${user.uid}/activities`), {
          activityName: "Password Activity",
          score: calculatedScore,
          password1_attempts: currentAttempts + 1,
          timestamp: new Date(),
          elapsedTime: formatTime(elapsedSeconds),
        });
      }
    }
  };

  // function to format time
  const formatTime = (seconds: number): string => {
    // checking if seconds is NaN
    if (isNaN(seconds)) {
      // if it is NaN, then return "00:00:00"
      return "00:00:00";
    }

    // if not, then format the time
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // add leading zeroes
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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

  // calculate the percentage score
  const maxPossibleScore = 4;
  const percentageScore = score !== null ? (score / maxPossibleScore) * 100 : 0;

  const calculateStars = (percentageScore: number): number => {
    if (percentageScore >= 80) {
      return 3; // 3 stars for scores >= 80%
    } else if (percentageScore >= 60) {
      return 2; // 2 stars for scores >= 60% and < 80%
    } else if (percentageScore >= 40) {
      return 1; // 1 star for scores >= 40% and < 60%
    } else {
      return 0; // 0 stars for scores < 40%
    }
  };

  // number of stars based on the percentage score
  const stars = calculateStars(percentageScore);

  return (
    <main className="flex min-h-screen flex-col bg-[#ffecde] font-sans text-[#2d2d2d]">
      <title>Tech Education</title>
      <Nav />
      <div className="mx-auto mt-10 w-full max-w-3xl flex-grow px-4 py-8 md:flex md:justify-center md:px-8">
        <div className="w-full md:flex md:items-start md:justify-center">
          {/* container for password game */}
          <div className="w-full">
            <form
              onSubmit={
              }
              className="rounded-lg bg-white p-6 py-[26px] shadow-md"
            >
              <div className="flex flex-col">
                <label
                  htmlFor="psw"
                  className="text-lg font-semibold text-[#5c93ff]"
                >
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="psw"
                    name="psw"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:border-[#5c93ff] focus:outline-none"
                    required
                    disabled={!isGameStarted}
                    placeholder={
                      isGameStarted
                        ? ""
                        : "Click the 'Start' button to begin playing"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="-mt-4 ml-2 rounded-md bg-[#ff5a5f] px-3 py-2 text-white hover:bg-[#ff914d] focus:outline-none"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                <div id="message" className="mb-4 rounded-lg bg-gray-100 p-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    Create a password with the following:
                  </h3>
                  <p
                    className={`p-1 ${password.match(/[a-z]/g) ? "text-green-500" : "text-red-500"}`}
                  >
                    {password.match(/[a-z]/g) ? "✔" : "✘"} A <b>lowercase</b>{" "}
                    letter
                  </p>
                  <p
                    className={`p-1 ${password.match(/[A-Z]/g) ? "text-green-500" : "text-red-500"}`}
                  >
                    {password.match(/[A-Z]/g) ? "✔" : "✘"} A{" "}
                    <b>capital (uppercase)</b> letter
                  </p>
                  <p
                    className={`p-1 ${password.match(/[0-9]/g) ? "text-green-500" : "text-red-500"}`}
                  >
                    {password.match(/[0-9]/g) ? "✔" : "✘"} A <b>number</b>
                  </p>
                  <p
                    className={`p-1 ${password.length >= 8 ? "text-green-500" : "text-red-500"}`}
                  >
                    {password.length >= 8 ? "✔" : "✘"} At least{" "}
                    <b>8 characters</b>
                  </p>
                </div>
                <div className="relative mb-5 h-4 overflow-hidden rounded-md border border-gray-300 bg-gray-100">
                  <div
                    className="absolute left-0 top-0 h-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${progressWidth}%`,
                      background:
                        strength === 4
                          ? "#48bb78"
                          : strength > 0
                            ? "linear-gradient(to right, #f56565, #ecc94b)"
                            : "#f56565",
                    }}
                  />
                </div>
              </div>
              {/* start/submit button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleStart}
                  className={`w-full rounded-md bg-[#ff5a5f] px-4 py-2 text-lg font-bold text-white hover:bg-[#ff914d] focus:outline-none ${isGameStarted ? "hidden" : ""}`}
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2 text-lg" />
                  Start
                </button>
                <button
                  type="submit"
                  className={`w-full rounded-md bg-[#5c93ff] px-4 py-2 text-lg font-bold text-white hover:bg-[#ff914d] focus:outline-none ${!isGameStarted ? "hidden" : ""}`}
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2 text-lg" />
                  Submit
                </button>
                <ToastContainer 
                  className="Toast-position mt-20"
                  position = "top-center"
              />
              </div>
            </form>
          </div>

          {/* Stats Box Component */}
          <div className="mt-4 md:mt-0 md:w-1/3 md:flex-shrink-0">
            <Stats
              attempts={password1_attempts}
              elapsedTime={elapsedTime}
              score={score}
              renderStars={() => stars}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PasswordPage;
