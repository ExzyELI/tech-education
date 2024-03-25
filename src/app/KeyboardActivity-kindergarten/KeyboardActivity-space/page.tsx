"use client";
import React, { useState, useEffect } from "react";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/init_app";

const SpaceKeyPressPage = () => {
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
    //register to the database only once
    const [databaseRegistered, setDatabaseRegistered] = useState(false);

    const router = useRouter();
    const firestore = getFirestore();

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            setAttempts((prevAttempts) => prevAttempts + 1);
            setKeyPressed(e.code);
            //check if the space button is pressed
            setCorrectPress(e.code === "Space");
            setShowMarks(true);

            //if the correct key is pressed, save the activity data to the database
            if (e.code === "Space" && !databaseRegistered) {
                setDatabaseRegistered(true); //prevent further registrations

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
                    correctPress: true,
                }, { merge: true });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [firestore, user, attempts, startTime, databaseRegistered]);

    // path to next activity
    const goToNextTask = () => {
        router.push("/KeyboardActivity-kindergarten/KeyboardActivity-enter");
    };

    return (
        <main className="flex min-h-screen flex-col justify-between bg-[#FAF9F6] font-serif leading-normal tracking-normal text-[#132241]">            <title>Press Space Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                {/* title and image path */}
                <h1 className="text-2xl font-bold">Press the Space Button</h1>
                <img src="/images/space-key-press.gif" alt="Press Space" className="mt-4" />
                {showMarks && (
                    <p className="mt-4 text-lg">
                        {/* show the user what key was pressed  */}
                        {correctPress ? (
                            <span className="text-green-500">✓ Correct! You pressed the Space button.</span>
                        ) : (
                            <span className="text-red-500">✗ You pressed {keyPressed}. Please press the Space button.</span>
                        )}
                    </p>
                )}
                {/* display next activity button */}
                {correctPress && (
                    <button
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                        onClick={goToNextTask}
                    >
                        Next Activity
                    </button>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default SpaceKeyPressPage;

