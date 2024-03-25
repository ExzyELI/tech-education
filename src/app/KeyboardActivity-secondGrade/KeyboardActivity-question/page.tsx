"use client";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const WordInputPage = () => {
    const targetWord = "question"; //word to match
    const [typedWord, setTypedWord] = useState(""); //store key presses as a word
    const [correctPress, setCorrectPress] = useState(false);
    const [showMarks, setShowMarks] = useState(false);
    const router = useRouter();

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
        router.push("/KeyboardActivity-secondGrade/KeyboardActivity-rock");
    };

    return (
        <main className="flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
            <title>Type Word Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Type the word: '{targetWord}'</h1>
                {/* image path */}
                <img src="/images/question-key-press.gif" alt="Type Word" className="mt-4" />
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
            <Footer />
        </main>
    );
};

export default WordInputPage;
