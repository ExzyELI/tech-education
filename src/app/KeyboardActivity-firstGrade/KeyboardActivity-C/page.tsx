"use client";
import Nav from "../../../../comps/nav";
import Footer from "../../../../comps/footer";
import React, { useState, useEffect } from "react";

const KeyCKeyPressPage = () => {
    //store the last key pressed
    const [keyPressed, setKeyPressed] = useState("");
    //track if the correct key was pressed
    const [correctPress, setCorrectPress] = useState(false);
    //track if the marks should be shown 
    const [showMarks, setShowMarks] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            //check if the KeyC button is pressed
            if (e.code === "KeyC") {
                setKeyPressed("KeyC");
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

    return (
        <main className="flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
            <title>Press KeyC Activity</title>
            <Nav />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Press the KeyC Button</h1>
                {/* image path */}
                <img src="/images/KeyC-key-press.gif" alt="Press KeyC" className="mt-4" />
                {showMarks && (
                    <p className="mt-4 text-lg">
                        {/* display if right key is pressed */}
                        {correctPress ? (
                            <span className="text-green-500">✓ Correct! You pressed the KeyC button.</span>
                        ) : (
                            //display any other key pressed */}
                            <span className="text-red-500">✗ You pressed {keyPressed}. Please press the KeyC button.</span>
                        )}
                    </p>
                )}
            </div>
            <Footer />
        </main>
    );
};

export default KeyCKeyPressPage;
