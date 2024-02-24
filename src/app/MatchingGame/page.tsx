"use client";
import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import MatchingNavBar from "./MatchingNavBar";
import Footer from "../../../comps/footer";

export default function Home() {
  const initialCards = Array.from(Array(8).keys()).concat(Array.from(Array(8).keys()));
  const [cards, setCards] = useState(shuffle(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameWon(true);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (index) => {
    // Ignore clicks on already matched or flipped cards
    if (matchedCards.includes(index) || flippedCards.includes(index) || isDisabled) {
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

  const resetGame = () => {
    setCards(shuffle(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setClickCount(0);
    setIsDisabled(false);
    setIsGameWon(false);
  };

  return (
    <main>
      <MatchingNavBar />
      <div className="font-family: font-serif leading-normal tracking-normal text-[#132241]">
        <div className="flex h-screen min-h-screen bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
          <div className="container bg-black">
            <div className="font-serif leading-normal tracking-normal text-[#132241]">
              <div className="flex h-screen min-h-screen bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
                <div className="container mx-auto py-6 px-[300px]">
                  <h1 className="text-4xl font-bold text-center mt-2">Match the Tech!</h1>
                  <p className="text-xl text-center mt-4">Instructions: Click on cards to match them.</p>
                  <p className="text-center">Click Count: {clickCount}</p>
                  <div className="container border-dashed border-4 border-sky-300 bg-sky-200 py-2 px-4 mt-8">
                    <section className="tiles grid grid-cols-4 gap-3 justify-items-center ">
                      {cards.map((card, index) => (
                        <button
                          key={index}
                          className={`w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center memory-card ${flippedCards.includes(index) || matchedCards.includes(index) ? "flipped" : ""}`}
                          onClick={() => handleCardClick(index)}
                          disabled={isDisabled || matchedCards.includes(index)}
                        >
                          {flippedCards.includes(index) || matchedCards.includes(index) ? card : "Tech"}
                        </button>
                      ))}
                    </section>
                  </div>
                  {isGameWon && (
                    <div className="text-center mt-4 text-green-600 font-bold">
                      Congratulations! You've won the game!
                    </div>
                  )}
                  <div className="flex justify-center mt-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={resetGame}>Reset Game</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
