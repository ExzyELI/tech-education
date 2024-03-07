"use client";
import { ReactNode } from 'react';
import { useState, useEffect } from "react";
import { shuffle } from "lodash"; // npm run lodash
import Footer from "../../../comps/footer";
import { auth, useHandleRedirect } from "@/app/firebase/init_app";
import Nav from "../../../comps/nav";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  setDoc,
  increment,
  doc,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { User } from "firebase/auth";

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
  const [user, setUser] = useState<User | null>(null); // store logged in user
  const [matching1_attempts, setAttempts] = useState(0); // store attempts
  let interval: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // update the user state when auth state changes
      console.log("Can you see this?")
    });

    return () => unsubscribe();
  }, []);
  
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

  const handleSave = async () => {
    console.log(user);
    const firestore = getFirestore();
      if (user) {
        const userDocRef = doc(firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const currentAttempts = userData?.matching1_attempts || 0; // 0 if no attempts found
          // update attempts locally
          setAttempts(currentAttempts + 1);
          // update attempts to firestore
          await setDoc(userDocRef, { matching1_attempts: increment(1) }, { merge: true });
          // save activity data in firestore
          await addDoc(collection(firestore, `users/${user.uid}/activities`), {
            activityName: "Matching Activity",
            score: finalScore,
            matching1_attempts: currentAttempts + 1,
            timestamp: new Date(),
            elapsedTime: formatTime(seconds),
          });
          console.log("worked");
        }
      }
      //toast.success("Score submitted successfully!"); // show success message
  }
  
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameWon(true);
      handleStop();
      handleSave();
      console.log("hello1");
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
  const calculateScore = () => {
    const totalMoves = clickCount;
    const elapsedTime = seconds;
    const score = (12000 - totalMoves * 100 - elapsedTime * 10)/2500;
    if (score >= 4){
      return 4 
    }
    else if (score >= 3.5){
      return 3.5
    }
    else if (score >= 3){
      return 3
    }
    else if (score >= 2.5){
      return 2.5
    }
    else if (score >= 2){
      return 2
    }
    else if (score >= 1.5){
      return 1.5
    }
    else if (score >= 1){
      return 1
    }
    //return Math.max(score,0);
  }
  const finalScore = calculateScore()
  
  return (
    <main>
      <div className="font-sans leading-normal tracking-normal text-[#132241]">
        {/*navbar begins */}
        <Nav/>
        {/* navbar ends */}
        <div className="flex min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#FAF9F6] text-[#434343]">
          <div className="container mx-auto max-w-3xl px-4 py-6">
            <h1 className="mt-2 text-center text-7xl font-bold">
              Match the Tech!
            </h1>
            <p className="mt-2 text-center text-xl">
              Instructions: Click on cards to match them.
            </p>
            <div className="mx-[290px]"> 
            {!gameStarted && (
              <button className="rounded-lg bg-[#ffe08d] shadow-md px-6 py-4 mt-4 text-xl transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#ff914d]" onClick={startGame}>Start Game</button>
            )}
          </div>
          {gameStarted && (
            <div>
              <div className="mt-4 flex justify-evenly">
                <p className="bg-[#5c93ff] text-white rounded-lg p-4 border-gray-300 border-4 cursor-none">Click Count: {clickCount}</p>
                <p className="bg-[#5c93ff] text-white rounded-lg p-4 border-gray-300 border-4 w-33 cursor-none">Timer: {formatTime(seconds)}</p>
              </div>
              <div className="container mt-8 border-4 border-dashed border-[#5c93ff] bg-[#5ab2ff] px-4 py-4">
        <section className="grid grid-cols-4 justify-items-center gap-4">
          {cards.map((card, index) => (
            <button
            key={index}
            className={`memory-card flex h-40 w-40 items-center justify-center rounded-lg bg-[#ff5a5f] text-white hover:bg-[#ff4146] focus:outline-none focus:ring focus:ring-black active:bg-[#ff4146] shadow-lg ${flippedCards.includes(index) || matchedCards.includes(index) ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
            disabled={isDisabled || matchedCards.includes(index)}
        >
            {flippedCards.includes(index) || matchedCards.includes(index) ? (
                <img
                    src={images[card]}
                    alt={`Card ${index}`}
                    style={{ width: "100%", height: "100%"}}
                />
            ) : (
                <img src="https://cdn.discordapp.com/attachments/1196945767785578598/1205159897663279114/Screen_Shot_2024-02-08_at_9.34.52_AM.png?ex=65f30b1e&is=65e0961e&hm=0f846bd73ee4c0bb03c39dc0488456a41e7ab937acd0f0824327bd152cd18dc7&"
                
                style={{ width: "75%", height: "75%"}} />
            )}
        </button>
          ))}
        </section>
      </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 shadow-md"
                  onClick={resetGame}>Reset Game </button>
              </div>
              {isGameWon && (
                <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-green-500 bg-opacity-90 text-white rounded-lg p-8">
                  <div className="text-6xl font-bold text-center">
                    Great Job!
                    <div className="flex items-center justify-center animate-bounce"> {/* Flex container */}
                      <img src="/CGimages/goodjob-man (1).png" style={{ width: "350px", height: "350px" }} />
                    </div>
                  </div>
                  <p className="bg-green-500 bg-opacity-60 text-white text-3xl rounded-lg p-1 text-center">Score: {finalScore}</p>
                </div>
              </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}