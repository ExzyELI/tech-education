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
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //check if the arrows button is pressed
      if (e.code === "ArrowRight") {
        setKeyPressed("ArrowRight");
        setCorrectPress(true);
        setShowMarks(true);
      } else if (e.code === "ArrowLeft") {
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
    router.push("/activities");
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  const overlay = () => {
    setShowOverlay(true);
  };

  return (
    <main className="flex min-h-screen flex-col space-y-[110px] bg-[#FAF9F6] font-serif leading-normal tracking-normal text-[#132241]">
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
              <p className="text-2xl font-bold">Congratulations!</p>
              <p className="text-large">
                You finished the keyboard Activities for the kindergarten grade
                level.
              </p>
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
