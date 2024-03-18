"use client";
import { useState, useEffect, useRef } from "react";
import { questions } from "./questions";
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
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0); // set current question
  const [score, setScore] = useState(0); // set score
  const [showAnswer, setShowAnswer] = useState(false); // show correct answer
  const [guessedRight, setGuessedRight] = useState<Array<boolean | null>>(
    Array(questions.length).fill(null),
  );
  const [user, setUser] = useState<User | null>(null); // store logged in user
  const [elapsedTime, setElapsedTime] = useState<number>(0); // store elapsed time
  const timerRef = useRef<number | null>(null); // timer reference
  const [isGameStarted, setIsGameStarted] = useState(false); // store game start state
  const [lastQuestion, setLastQuestion] = useState(false); // store last question state
  const [startTime, setStartTime] = useState<Date | null>(null); // store start time
  const [quizK_attempts, setAttempts] = useState(0); // store attempts
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );

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

  // function to reset quiz
  const resetQuizState = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setGuessedRight(Array(questions.length).fill(null));
    setLastQuestion(false);
    setElapsedTime(0);
    setSelectedAnswerIndex(null);
  };

  // function to start game
  const handleStart = () => {
    console.log(isGameStarted);
    setIsGameStarted(true);
    console.log(isGameStarted);
    setStartTime(new Date()); // timer begins when game starts
    setElapsedTime(0);
    startTimer();
    // attempts counter
    setAttempts((prevAttempts) => prevAttempts + 1);
    resetQuizState();
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
    console.log(isGameStarted);

    const firestore = getFirestore();
    // submit activity data to the database
    if (user) {
      const userDocRef = doc(firestore, `users/${user.uid}`);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentAttempts = userData?.quizK_attempts || 0; // 0 if no attempts found
        // update attempts locally
        setAttempts(currentAttempts + 1);
        // update attempts to firestore
        await setDoc(
          userDocRef,
          { quizK_attempts: increment(1) },
          { merge: true },
        );
        // save activity data in firestore
        await addDoc(collection(firestore, `users/${user.uid}/activities`), {
          activityName: "Quiz Activity K",
          score: score,
          quizK_attempts: currentAttempts + 1,
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

  // function to handle button click
  const handleButtonClick = (isCorrect: boolean, index: number) => {
    setSelectedAnswerIndex(index); // Update selected answer index
    const updatedGuessedRight = guessedRight.map((value, i) =>
      i === currentQuestion ? isCorrect : value,
    );
    setGuessedRight(updatedGuessedRight);
    setShowAnswer(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = async () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setShowAnswer(false);
      setCurrentQuestion(nextQuestion);
      setSelectedAnswerIndex(null);
    }
    if (nextQuestion >= questions.length) {
      setLastQuestion(true);
      console.log(lastQuestion);
      handleSubmit();
    }
  };

  return (
    <main className="font-family: flex min-h-screen flex-col space-y-[60px] bg-[#FAF9F6] font-sans leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      <Nav />
      <div className="//rounded-lg //bg-white //border mx-[200px] flex justify-center border-gray-200">
        <div className="flex-child ml-[200px] w-[500px]">
          {(() => {
            switch (isGameStarted) {
              case true:
                return (
                  <div>
                    <div className="mb-4">
                      <h2 className="mb-2 mt-5 text-2xl font-semibold">
                        Question {currentQuestion + 1} of {questions.length}
                      </h2>
                      <p className="border-1 mb-3 flex w-full items-center justify-center rounded-lg bg-white p-3 font-semibold text-[#5c93ff] shadow md:p-5">
                        {questions[currentQuestion].question}
                      </p>
                      <div className="mb-8 flex justify-center">
                        {questions[currentQuestion].image && (
                          <img src={questions[currentQuestion].image} />
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      {questions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            className={`mb-2 w-5/6 rounded-lg px-12 py-4 text-lg text-black transition hover:bg-gray-200  ${
                              showAnswer && option.isCorrect
                                ? "bg-green-300 hover:bg-green-300"
                                : showAnswer && !option.isCorrect
                                  ? "bg-red-300 hover:bg-red-300"
                                  : "bg-white"
                            } ${
                              selectedAnswerIndex === index && option.isCorrect
                                ? "border-4 border-dashed border-green-500"
                                : selectedAnswerIndex === index &&
                                    !option.isCorrect
                                  ? "border-4 border-dashed border-red-500"
                                  : ""
                            }`}
                            onClick={() =>
                              handleButtonClick(option.isCorrect, index)
                            }
                            disabled={!isGameStarted || showAnswer}
                          >
                            <div className="flex items-center justify-center">
                              {option.image && (
                                <img src={option.image} className="mr-2" />
                              )}
                              {option.text}
                            </div>
                          </button>
                        ),
                      )}
                    </div>
                    <div className="mt-4">
                      <div className="my-4 flex justify-center">
                        {questions.map((question, i) => (
                          <div
                            key={i}
                            className={`mx-1 flex h-5 w-5 items-center justify-center rounded text-center text-xs text-white ${
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
                  </div>
                );
              case false:
                return (
                  <div className="mb-[200px] mt-[180px] w-[500px] rounded-lg border border-gray-200 bg-white px-5 py-5 text-[#5c93ff] shadow">
                    <h5 className="mb-2 text-center text-xl font-bold tracking-tight">
                      Ready to take your quiz now?
                    </h5>
                    <h5 className="mb-2 text-center text-xl font-bold tracking-tight">
                      Click start to begin!
                    </h5>
                    <div className="mx-[130px]">
                      <button
                        type="button"
                        onClick={handleStart}
                        className={`w-[200px] rounded-md bg-[#ff5a5f] px-4 py-2 text-lg font-bold text-white hover:scale-110 hover:bg-[#ff914d] focus:outline-none ${isGameStarted ? "hidden" : ""}`}
                      >
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="mr-2 text-lg"
                        />
                        Start Quiz
                      </button>
                    </div>
                  </div>
                );
            }
          })()}
          <div className="mx-[150px] mt-10">
            <button
              type="button"
              onClick={handleNext}
              className={`mb-2 w-[200px] rounded-md bg-[#5c93ff] px-4 py-2 text-lg font-bold text-white hover:scale-110 hover:bg-[#ff914d] focus:outline-none ${!isGameStarted ? "hidden" : ""}`}
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-4 w-5" />
            </button>
            <ToastContainer
              className="Toast-position mt-[120px]"
              position="top-center"
            />
          </div>
        </div>
        <div className="float ml-20 mt-[60px] flex md:flex">
          <Stats
            attempts={quizK_attempts}
            elapsedTime={elapsedTime}
            score={score}
            renderStars={() => stars}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
