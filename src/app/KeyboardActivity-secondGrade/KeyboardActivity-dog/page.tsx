"use client";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/init_app";

const WordInputPage = () => {
    const targetWord = "dog"; //word to match
    const [typedWord, setTypedWord] = useState(""); //store key presses as a word
    const [correctPress, setCorrectPress] = useState(false);
    const [showMarks, setShowMarks] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [startTime] = useState(new Date());
    const [databaseRegistered, setDatabaseRegistered] = useState(false);
    const [user] = useAuthState(auth);
    const router = useRouter();
    const firestore = getFirestore();

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (!e.key.match(/^[A-Za-z]$/)) return;
            
            setAttempts((prevAttempts) => prevAttempts + 1);
            const newWord = (typedWord + e.key).toLowerCase();
            setShowMarks(true);

            if (newWord === targetWord) {
                setTypedWord(newWord);
                setCorrectPress(true);

                // Save to database once correct word is typed
                if (!databaseRegistered) {
                    setDatabaseRegistered(true); //prevent further registrations
                    
                    const endTime = new Date();
                    const elapsedTimeMs = endTime.getTime() - startTime.getTime();
                    const elapsedTimeSec = elapsedTimeMs / 1000;
                    const minutes = Math.floor(elapsedTimeSec / 60);
                    const seconds = Math.floor(elapsedTimeSec % 60);
                    const formattedElapsedTime = `00:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
                    const userActivityDocRef = doc(collection(firestore, `users/${user!.uid}/activities`));

                    await setDoc(userActivityDocRef, {
                        activityName: "KeyboardActivity-secondGrade",
                        elapsedTime: formattedElapsedTime,
                        KeyboardActivitysecondGrade_attempts: attempts,
                        score: 1,
                        timestamp: serverTimestamp(),
                        typedWord: newWord,
                        correctPress: true,
                    }, { merge: true });
                }
            } else {
                setTypedWord(newWord);
                setCorrectPress(false);
                if (newWord.length >= targetWord.length) {
                    setTimeout(() => {
                        if (!correctPress) {
                            setTypedWord("");
                            setShowMarks(false);
                        }
                    }, 3000); //reset after 3 seconds
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [firestore, user, typedWord, correctPress, attempts, startTime, databaseRegistered, targetWord]);

    // path to next task
    const goToNextTask = () => {
        router.push("/KeyboardActivity-secondGrade/KeyboardActivity-eye");
    };

    return (
        <main className="flex min-h-screen flex-col justify-between bg-[#FAF9F6] font-serif leading-normal tracking-normal text-[#132241]">
            <title>Type Word Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Type the word: '{targetWord}'</h1>
                {/* image path */}
                <img src="/images/dog-key-press.gif" alt="Type Word" className="mt-4" />
                {showMarks && (
                    <p className="mt-4 text-lg">
                        {correctPress ? (
                            <span className="text-green-500">✓ Correct! You typed "{typedWord}".</span>
                        ) : (
                            <span className="text-red-500">✗ You typed "{typedWord}". Please type "{targetWord}".</span>
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
            <div className="mb-5">
            </div>
            <Footer />
        </main>
    );
};

export default WordInputPage;
