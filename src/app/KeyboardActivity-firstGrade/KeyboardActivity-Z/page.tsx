"use client";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const KeyZKeyPressPage = () => {
    //store the last key pressed
    const [keyPressed, setKeyPressed] = useState("");
    //track if the correct key was pressed
    const [correctPress, setCorrectPress] = useState(false);
    //track if the marks should be shown 
    const [showMarks, setShowMarks] = useState(false);
    const router = useRouter();
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            //check if the KeyZ button is pressed
            if (e.code === "KeyZ") {
                setKeyPressed("KeyZ");
                setCorrectPress(true);
                setShowMarks(true);
            } else {
                //if any other key is pressed
                setKeyPressed(e.code);
                setCorrectPress(false);
                setShowMarks(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

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
            <title>Press KeyZ Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Press the KeyZ Button</h1>
                {/* image path */}
                <img src="/images/KeyZ-key-press.gif" alt="Press KeyZ" className="mt-4" />
                {showMarks && (
                    <p className="mt-4 text-lg">
                        {/* display if right key is pressed */}
                        {correctPress ? (
                            <span className="text-green-500">✓ Correct! You pressed the KeyZ button.</span>
                        ) : (
                            //display any other key pressed */}
                            <span className="text-red-500">✗ You pressed {keyPressed}. Please press the KeyZ button.</span>
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
                            <p className="text-large">You finished the keyboard Activities for the first grade level.</p>
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

export default KeyZKeyPressPage;
