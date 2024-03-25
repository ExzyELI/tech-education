"use client";
import React, { useState, useEffect } from "react";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/init_app";

const ctrlKeyPressPage = () => {
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

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            setAttempts((prevAttempts) => prevAttempts + 1);
            setKeyPressed(e.code);
            let isCorrect: boolean;
            //check if the shifts buttons are pressed
            if (isCorrect = e.code === "ControlLeft" || e.code === "ControlRight") {
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
        router.push("/KeyboardActivity-kindergarten/KeyboardActivity-alt");
    };

    return (
        <main className="flex min-h-screen flex-col justify-between bg-[#FAF9F6] font-serif leading-normal tracking-normal text-[#132241]">            <title>Press any of the ctrl Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Press ctrlLeft or ctrlRight Button</h1>
                {/* image path */}
                <img src="/images/ctrl-key-press.gif" alt="Press ctrl" className="mt-4" />
                {showMarks && (
                    <p className="mt-4 text-lg">
                        {/* display if right key is pressed */}
                        {correctPress ? (
                            <span className="text-green-500">✓ Correct! You pressed the {keyPressed} button.</span>
                        ) : (
                            //display any other key pressed */}
                            <span className="text-red-500">✗ You pressed {keyPressed}. Please press any of ctrl buttons.</span>
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

export default ctrlKeyPressPage;
