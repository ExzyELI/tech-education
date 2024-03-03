"use client";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import React, { useState, useEffect } from "react";

const WordInputPage = () => {
    const targetWord = "kite"; //word to match
    const [typedWord, setTypedWord] = useState(""); //store key presses as a word
    const [correctPress, setCorrectPress] = useState(false);
    const [showMarks, setShowMarks] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            
            if (!e.key.match(/^[A-Za-z]$/)) return;

            const newWord = (typedWord + e.key).toLowerCase();
            setTypedWord(newWord);
            setShowMarks(true);

            if (newWord === targetWord) {
                setCorrectPress(true);
            } else {
                setCorrectPress(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        if (typedWord.length === targetWord.length || correctPress) {
            setTimeout(() => {
                setTypedWord("");
                setShowMarks(false);
            }, 3000); // Reset after 3seconds
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [typedWord, correctPress]);

    return (
        <main className="flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
            <title>Type Word Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Type the word:'{targetWord}'</h1>
                {/* image path */}
                <img src="/images/kite-key-press.gif" alt="Type Word" className="mt-4" />
                {showMarks && (
                    <p className="mt-4 text-lg">
                        {correctPress ? (
                            <span className="text-green-500">✓ Correct! You typed "{typedWord}".</span>
                        ) : (
                            <span className="text-red-500">✗ You typed "{typedWord}". Please type "{targetWord}".</span>
                        )}
                    </p>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default WordInputPage;
