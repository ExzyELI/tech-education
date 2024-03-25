"use client";
import React, { useState, useEffect } from "react";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/init_app";

const arrowsKeyPressPage = () => {
  //store the last key pressed
  const [keyPressed, setKeyPressed] = useState("");
  //track if the correct key was pressed
  const [correctPress, setCorrectPress] = useState(false);
  //track if the marks should be shown 
  const [showMarks, setShowMarks] = useState(false);
  //track how many wrong key presses attempts
  const [attempts, setAttempts] = useState(0);
  //start time initialized to current date and time
  const [startTime] = useState(new Date());
  //get the current user
  const [user] = useAuthState(auth);
  //track if the update is performed
  const [updatePerformed, setUpdatePerformed] = useState(false);

  const router = useRouter();
  const firestore = getFirestore();
  //show overlay when the activity is finished
  const [showOverlay, setShowOverlay] = useState(false);

  const [totalScore, setTotalScore] = useState(0);

  // Function to fetch and sum scores from Firestore
  useEffect(() => {
    const fetchAndSumScores = async () => {
      const activitiesRef = collection(firestore, `users/${user!.uid}/activities`);
      const snapshot = await getDocs(activitiesRef);
      const totalScore = snapshot.docs
        .filter(doc => doc.data().activityName === "KeyboardActivity-kindergarten")
        .reduce((sum, doc) => sum + doc.data().score, 1);
      setTotalScore(totalScore); // Set the total score state
    };

    if (user) { // Make sure user is loaded before fetching
      fetchAndSumScores();
    }
  }, [firestore, user]); // Added user dependency to ensure user is loaded

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      setAttempts((prevAttempts) => prevAttempts + 1);
      setKeyPressed(e.code);
      let isCorrect: boolean;
      //check if the shifts buttons are pressed
      if (isCorrect = e.code === "ArrowRight" || e.code === "ArrowLeft") {
        setKeyPressed(e.code);
        setCorrectPress(isCorrect);
        setShowMarks(true);

        if (!updatePerformed) {
          //if the correct key is pressed, save the activity data to the database
          const endTime = new Date();
          const elapsedTimeMs = endTime.getTime() - startTime.getTime();
          const elapsedTimeSec = elapsedTimeMs / 1000;
          const minutes = Math.floor(elapsedTimeSec / 60);
          const seconds = Math.floor(elapsedTimeSec % 60);
          const formattedElapsedTime = `00:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
          const userActivityDocRef = doc(collection(firestore, `users/${user!.uid}/activities`));

          await setDoc(userActivityDocRef, {
            activityName: "KeyboardActivity-kindergarten",
            elapsedTime: formattedElapsedTime,
            KeyboardActivityKindergarten_attempts: attempts,
            score: 1,
            timestamp: serverTimestamp(),
            keyPressed: e.code,
            correctPress: isCorrect,
          }, { merge: true });
          setUpdatePerformed(true);

        }
      } else {
        // Reset states if a wrong key is pressed
        setCorrectPress(false);
        setShowMarks(true);
        // Ensure we can update the database on the next correct key press
        //setUpdatePerformed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [firestore, user, attempts, startTime, updatePerformed]);

  // path to next task
  const goToNextTask = () => {
    router.push("/activities");
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  const overlay = () => {
    setShowOverlay(true);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#FAF9F6] font-serif leading-normal tracking-normal text-[#132241]">      
    <title>Press Arrow Right or Arrow Left Activity</title>
      <Nav />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Press Arrow Right or Arrow Left Buttons
        </h1>
        {/* image path */}
        <img
          src="/images/ArrowRightArrowLeft-key-press.gif"
          alt="Press arrows"
          className="mt-4"
        />
        {showMarks && (
          <p className="mt-4 text-lg">
            {/* display if right key is pressed */}
            {correctPress ? (
              <span className="text-green-500">
                ✓ Correct! You pressed the {keyPressed} button.
              </span>
            ) : (
              //display any other key pressed */}
              <span className="text-red-500">
                ✗ You pressed {keyPressed}. Please press Arrow Right or Arrow
                Left buttons.
              </span>
            )}
          </p>
        )}
        {/* display next activity button */}
        {correctPress && (
          <button
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-600"
            onClick={overlay}
          >
            Finish Activity
          </button>
        )}
        {showOverlay && (
          <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-5 text-center">
              <div className="flex justify-end">
                <button onClick={closeOverlay} className="text-xl font-bold">
                  &times;
                </button>
              </div>
              {/* Overlay content */}
              <p className="text-3xl font-bold">Congratulations!</p>
              <p className="text-3xl">🌟🌟🌟</p>
              <p className="text-xl">You finished the keyboard Activities for the kindergarten grade.</p>
              <p className="text-xl">score: {totalScore}.</p>
              <button
                onClick={goToNextTask}
                className="mt-4 rounded bg-green-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-600"
              >
                Go to Activities page
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-5"></div>
      <Footer />
    </main>
  );
};

export default arrowsKeyPressPage;
