"use client";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const WordInputPage = () => {
    const targetWord = "zoo"; //word to match
    const [typedWord, setTypedWord] = useState(""); //store key presses as a word
    const [correctPress, setCorrectPress] = useState(false);
    const [showMarks, setShowMarks] = useState(false);
    const router = useRouter();
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {

            if (!e.key.match(/^[A-Za-z]$/)) return;

            const newWord = (typedWord + e.key).toLowerCase();
            setShowMarks(true);

            if (newWord === targetWord) {
                setTypedWord(newWord);
                setCorrectPress(true);
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

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [typedWord, correctPress, targetWord]);

    // path to next task
    const goToNextTask = () => {
        router.push("/src/app/activities");
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    const overlay = () => {
        setShowOverlay(true);
    };

    return (
        <main className="flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
            <title>Type Word Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Type the word: '{targetWord}'</h1>
                {/* image path */}
                <img src="/images/zoo-key-press.gif" alt="Type Word" className="mt-4" />
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
                        onClick={overlay}
                    >
                        Finish Activity
                    </button>
                )}
                {showOverlay && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-5 rounded-lg text-center">
                            <div className="flex justify-end">
                                <button onClick={closeOverlay} className="text-xl font-bold">&times;</button>
                            </div>
                            <p className="text-2xl font-bold">Congratulations!</p>
                            <p className="text-large">You finished the keyboard Activities for the second grade level.</p>
                            <button
                                onClick={goToNextTask}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                            >
                                Go to Activities page
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default WordInputPage;
