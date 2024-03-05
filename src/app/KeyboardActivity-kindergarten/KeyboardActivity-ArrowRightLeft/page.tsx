"use client";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

const arrowsKeyPressPage = () => {
    //store the last key pressed
    const [keyPressed, setKeyPressed] = useState("");
    //track if the correct key was pressed
    const [correctPress, setCorrectPress] = useState(false);
    //track if the marks should be shown 
    const [showMarks, setShowMarks] = useState(false);

    const router = useRouter(); 

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            //check if the arrows button is pressed
            if (e.code === "ArrowRight") {
                setKeyPressed("ArrowRight");
                setCorrectPress(true);
                setShowMarks(true);
            }
            else if (e.code === "ArrowLeft") {
                setKeyPressed("ArrowLeft");
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
        router.push("/KeyboardActivity-kindergarten/KeyboardActivity-ArrowRightLeft");
    };

    return (
        <main className="flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
            <title>Press Arrow Right or Arrow Left Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Press Arrow Right or Arrow Left Buttons</h1>
                {/* image path */}
                <img src="/images/ArrowRightArrowLeft-key-press.gif" alt="Press arrows" className="mt-4" />
                {showMarks && (
                    <p className="mt-4 text-lg">
                        {/* display if right key is pressed */}
                        {correctPress ? (
                            <span className="text-green-500">✓ Correct! You pressed the {keyPressed} button.</span>
                        ) : (
                            //display any other key pressed */}
                            <span className="text-red-500">✗ You pressed {keyPressed}. Please press Arrow Right or Arrow Left buttons.</span>
                        )}
                    </p>
                )}
                {/* display next activity button */}
                {correctPress && (
                    <button 
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                        onClick={goToNextTask} 
                    >
                        Finish Activity
                    </button>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default arrowsKeyPressPage;
