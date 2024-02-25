"use client";
import { useState, useEffect } from "react";
import { shuffle } from "lodash"; // npm run lodash
import MatchingNavBar from "./MatchingNavBar";
import Footer from "../../../comps/footer";

export default function Home() {
  const initialCards: number[] = Array.from(Array(8).keys()).concat(
    Array.from(Array(8).keys()),
  );
  const [cards, setCards] = useState<number[]>(shuffle(initialCards));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameWon(true);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (index: number): void => {
    // Ignore clicks on already matched or flipped cards
    if (
      matchedCards.includes(index) ||
      flippedCards.includes(index) ||
      isDisabled
    ) {
      return;
    }

    // Flip the clicked card
    const newFlippedCards: number[] = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // Check if two cards are flipped over
    if (newFlippedCards.length === 2) {
      setIsDisabled(true); // Disable further clicks until the comparison is done

      const [firstCardIndex, secondCardIndex] = newFlippedCards;

      // Check if the two flipped cards match
      if (cards[firstCardIndex] === cards[secondCardIndex]) {
        // If they match, add them to the matched cards array
        setMatchedCards([...matchedCards, firstCardIndex, secondCardIndex]);

        // Clear the flipped cards array
        setFlippedCards([]);

        setIsDisabled(false); // Enable clicks again
      } else {
        // If they don't match, flip them back after a short delay (e.g., 1 second)
        setTimeout(() => {
          setFlippedCards([]);
          setIsDisabled(false); // Enable clicks again
        }, 1000);
      }

      setClickCount((prevCount) => prevCount + 1); // Increment the click count
    }
  };

  const resetGame = (): void => {
    setCards(shuffle(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setClickCount(0);
    setIsDisabled(false);
    setIsGameWon(false);
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
            <p className="mt-4 text-center text-xl">
              Instructions: Click on cards to match them.
            </p>
            <p className="text-center">Click Count: {clickCount}</p>
            <div className="container mt-8 border-4 border-dashed border-sky-300 bg-sky-200 px-4 py-4">
              <section className="grid grid-cols-4 justify-items-center gap-4">
                {cards.map((card, index) => (
                  <button
                    key={index}
                    className={`memory-card flex h-40 w-40 items-center justify-center rounded-lg bg-violet-500 text-white hover:bg-violet-600 focus:outline-none focus:ring focus:ring-black active:bg-violet-700 ${flippedCards.includes(index) || matchedCards.includes(index) ? "flipped" : ""}`}
                    onClick={() => handleCardClick(index)}
                    disabled={isDisabled || matchedCards.includes(index)}
                  >
                    {flippedCards.includes(index) ||
                    matchedCards.includes(index)
                      ? card
                      : "Tech"}
                  </button>
                ))}
              </section>
            </div>
            {isGameWon && (
              <div className="mt-4 text-center font-bold text-green-600">
                Congratulations! You've won the game!
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
        </div>
      </div>
      <Footer />
    </main>
  );
}
