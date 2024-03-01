"use client";
import { ReactNode } from 'react';
import { useState, useEffect } from "react";
import { shuffle } from "lodash"; // npm run lodash
import MatchingNavBar from "./MatchingNavBar";
import Footer from "../../../comps/footer";

export default function Home() {
  const gridSize = 3;
  const totalCards = gridSize * (gridSize + 1); //amount of squares
  
  const images = [
    "/CGimages/mouse.png",
    "/CGimages/keyboard.png",
    "/CGimages/monitor.png",
    "/CGimages/password.png",
    "/CGimages/microphone.png",
    "/CGimages/cursor.png",
    
  ];
  const initialCards = Array.from(Array(totalCards).keys()).flatMap((num) => [
    num % images.length // Store the index of the image in the images array
  ]);
  const [cards, setCards] = useState<number[]>(shuffle(initialCards));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let interval: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval as NodeJS.Timeout);
    }

    return () => clearInterval(interval as NodeJS.Timeout);
  }, [isActive]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    if (gameStarted) {
      setIsDisabled(false);
    }
  }, [gameStarted]);
  
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameWon(true);
      handleStop();
    }
  }, [matchedCards, totalCards]);

  const handleCardClick = (index: number) => { // Ignore clicks on matched cards
    if (
      matchedCards.includes(index) ||
      flippedCards.includes(index) ||
      isDisabled
    ) {
      return;
    }

    // Flip the clicked card
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // Check if two cards are flipped over
    if (newFlippedCards.length === 2) {
      setIsDisabled(true); // Disable further clicks until the comparison is done

      const [firstCardIndex, secondCardIndex] = newFlippedCards;

      // Check if the two flipped cards match
      if (cards[firstCardIndex] === cards[secondCardIndex]) {
        // Matched, add them to the matched cards array
        setMatchedCards([...matchedCards, firstCardIndex, secondCardIndex]);

        // Clear the flipped cards array
        setFlippedCards([]);

        setIsDisabled(false); // Enable clicks again
      } else {
        // If they don't match, flip them back after a short delay
        setTimeout(() => {
          setFlippedCards([]);
          setIsDisabled(false); // Enable clicks again
        }, 500);
      }

      setClickCount((prevCount) => prevCount + 1); // Increment the click count
    }
  };

  const resetGame = (): void => { // Reset button functions
    setCards(shuffle(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setClickCount(0);
    setIsDisabled(false);
    setIsGameWon(false);
    setGameStarted(false);
    handleStop();
    handleReset();
  };
  
  const startGame = () => {
    setGameStarted(true);
    setCards(shuffle(initialCards)); // Shuffle cards after game is in start
    handleStart();
  };
  
  return (
    <main>
      <div className="font-serif leading-normal tracking-normal text-[#132241]">
        <MatchingNavBar />
        <div className="flex min-h-screen bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
          <div className="container mx-auto max-w-3xl px-4 py-6">
            <h1 className="mt-2 text-center text-4xl font-bold">
              Match the Tech!
            </h1>
            <p className="mt-2 text-center text-xl">
              Instructions: Click on cards to match them.
            </p>
            <div className="mx-[290px]"> 
            {!gameStarted && (
              <button className="rounded-lg bg-[#ffe08d] px-6 py-4 mt-4 text-xl" onClick={startGame}>Start Game</button>
            )}
          </div>
          {gameStarted && (
            <div>
              <div className="mt-4 flex justify-between">
                <p className="bg-green-500 bg-opacity-60 text-white rounded-lg p-8 text-center mr-4 ">Click Count: {clickCount}</p>
                <p className="bg-green-500 bg-opacity-60 text-white rounded-lg p-8 text-center">Timer: {formatTime(seconds)}</p>
              </div>
              <div className="container mt-8 border-4 border-dashed border-sky-300 bg-sky-200 px-4 py-4">
                <section className="grid grid-cols-4 justify-items-center gap-4">
                  {cards.map((card, index) => (
                    <button
                      key={index}
                      className={`memory-card flex h-40 w-40 items-center justify-center rounded-lg bg-violet-500 text-white hover:bg-violet-600 focus:outline-none focus:ring focus:ring-black active:bg-violet-700 ${flippedCards.includes(index) || matchedCards.includes(index) ? "flipped" : ""}`}
                      onClick={() => handleCardClick(index)}
                      disabled={isDisabled || matchedCards.includes(index)}
                    >
                      {flippedCards.includes(index) || matchedCards.includes(index) ? (
                        <img src={images[card]} alt={`Card ${index}`} />
                      ) : (
                        "Tech"
                      )}
                    </button>
                  ))}
                </section>
              </div>
              {isGameWon && (
                <div className="absolute inset-0 flex items-center justify-center ">
                  <div className="bg-green-500 bg-opacity-90 text-white rounded-lg p-8">
                    <div className="text-4xl font-bold text-center">
                      Congratulations! You Win!
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 flex justify-center">
                <button
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                  onClick={resetGame}
                >
                  Reset Game
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
