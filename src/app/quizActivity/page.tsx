"use client";
import {useState, useEffect, useRef} from "react";
import {questions} from "./questions";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import Stats from "../../../comps/stats";
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
import {
  faPlay,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";


export default function Quiz(){
    const [currentQuestion, setCurrentQuestion] = useState(0); // set current question
    const [score, setScore] = useState(0); // set score
    const [showAnswer, setShowAnswer] = useState(false);// show correct answer
    const [guessedRight, setGuessedRight] = useState<Array<boolean | null>>(
        Array(questions.length).fill(null)
      );
    const [user, setUser] = useState<User | null>(null); // store logged in user
    const [elapsedTime, setElapsedTime] = useState<number>(0); // store elapsed time
    const timerRef = useRef<number | null>(null); // timer reference
    const [isGameStarted, setIsGameStarted] = useState(false); // store game start state
    const [startTime, setStartTime] = useState<Date | null>(null); // store start time
    const [quiz1_attempts, setAttempts] = useState(0); // store attempts

    useEffect(() => {
  
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user); // update the user state when auth state changes
        if (user) {
          // checks if user exists
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
    };
  
    // function to handle form submission
    const handleSubmit = async () => {
      stopTimer();
      const endTime = new Date();
      const elapsedMilliseconds = startTime
        ? endTime.getTime() - startTime.getTime()
        : 0; // calculate elapsed time
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000); // converting elapsed time to seconds
      setElapsedTime(elapsedSeconds); // storing elapsed time
      setIsGameStarted(false);
  
      const firestore = getFirestore();
      // get current number of attempts from firestore
      if (user) {
        const userDocRef = doc(firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const currentAttempts = userData?.quiz1_attempts || 0; // 0 if no attempts found
          // update attempts locally
          setAttempts(currentAttempts + 1);
          // update attempts to firestore
          await setDoc(userDocRef, { quiz1_attempts: increment(1) }, { merge: true });
          // save activity data in firestore
          await addDoc(collection(firestore, `users/${user.uid}/activities`), {
            activityName: "Quiz Activity",
            score: score,
            quiz1_attempts: currentAttempts + 1,
            timestamp: new Date(),
            elapsedTime: formatTime(elapsedSeconds),
          });
        }
      }
      toast.success("Score submitted successfully!"); // show success message
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

    const handleButtonClick = (isCorrect: boolean) => {
        const updatedGuessedRight = guessedRight.map((value, index) =>
            index === currentQuestion ? isCorrect : value
        );
        setGuessedRight(updatedGuessedRight);
        setShowAnswer(true);
  
        if (isCorrect) {
            setScore(score + 1);
        }
    
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setTimeout(() => {
            setCurrentQuestion(nextQuestion);
            setShowAnswer(false);
            }, 1000); // Delaying for 1 second before moving to the next question
        }
    };

    return (
      <main className="font-family: flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
        <title>Tech Education</title>
        <Nav />
        <div className="flex justify-center">
          <div className="flex-child w-[500px] ml-[200px]">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 mt-5">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="border-1 bg-white font-semibold p-3 w-full rounded-lg shadow flex items-center justify-center md:p-5 mb-3">
                  {questions[currentQuestion].question}
              </p>
              <div className="flex justify-center mb-8">
                  {questions[currentQuestion].image && (<img src={questions[currentQuestion].image}/>)}
              </div>
            </div>
            <div className="text-center">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`px-12 py-4 mb-2 bg-[#e1f3ff] text-black text-lg rounded-lg hover:bg-gray-200 transition w-5/6  ${
                    showAnswer && option.isCorrect
                      ? "bg-green-300 hover:bg-green-300"
                      : showAnswer && !option.isCorrect
                      ? "bg-red-300 hover:bg-red-300"
                      : ""
                  }`}
                  onClick={() => handleButtonClick(option.isCorrect)}
                  disabled={!isGameStarted || showAnswer}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="mt-4">
            <div className="flex justify-center my-4">
              {questions.map((question, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded text-white mx-1 text-center text-xs flex items-center justify-center ${
                  guessedRight[i] === true
                      ? "bg-green-300"
                      : guessedRight[i] === false
                      ? "bg-red-300"
                      : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
            </div>
            <p className="mt-2 text-center font-semibold">Score: {score}</p>
          </div>
          <div className="float ml-20 mt-[70px]">
              <Stats
                attempts={quiz1_attempts}
                elapsedTime={elapsedTime}
                score={score}
                renderStars={() => stars}
              />
          </div>
        </div>
        <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleStart}
                  className={`w-[200px] rounded-md bg-[#ff5a5f] px-4 py-2 text-lg font-bold text-white hover:bg-[#ff914d] focus:outline-none ${isGameStarted ? "hidden" : ""}`}
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2 text-lg" />
                  Start
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`w-[200px] rounded-md bg-[#5c93ff] px-4 py-2 text-lg font-bold text-white hover:bg-[#ff914d] focus:outline-none ${!isGameStarted ? "hidden" : ""}`}
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2 text-lg" />
                  Submit
                </button>
          </div>
        <Footer />
      </main>
    );
  };
