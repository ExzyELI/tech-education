"use client";
import { ReactNode } from "react";
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
import Stats from "../../../comps/stats";

export default function Home() {
  const gridSize = 4;
  const totalCards = gridSize * gridSize; //grid cards set up

  //card images
  const images = [
    "/CGimages/mouse.png",
    "/CGimages/keyboard.png",
    "/CGimages/monitor.png",
    "/CGimages/password.png",
    "/CGimages/microphone.png",
    "/CGimages/cursor.png",
    "/CGimages/headphones.png",
    "/CGimages/usb.png",
  ];
  const initialCards = Array.from(Array(totalCards).keys()).flatMap((num) => [
    num % images.length, // Store the index of the image in the images array
  ]);
  const [cards, setCards] = useState<number[]>(shuffle(initialCards)); //initial cards with a number
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // card flipper
  const [matchedCards, setMatchedCards] = useState<number[]>([]); // set matched cards aside
  const [clickCount, setClickCount] = useState<number>(0); // store clicks
  const [isDisabled, setIsDisabled] = useState<boolean>(false); // disable cards when matched
  const [isGameWon, setIsGameWon] = useState<boolean>(false); // all Cards are matched 
  const [gameStarted, setGameStarted] = useState(false); // preform SetCards and start timer
  const [seconds, setSeconds] = useState(0); // timer
  const [isActive, setIsActive] = useState(false); // card is live
  const [finalScore, setFinalScore] = useState<number | null>(null); // store user's score
  const [user, setUser] = useState<User | null>(null); // store logged in user
  const [matching2_attempts, setAttempts] = useState(0); // store attempts
  let interval: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // update the user state when auth state changes
      console.log("Can you see this?");
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

  const formatTime = (time: number) => { // Timer format
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
    setFinalScore(score);

    const firestore = getFirestore();
    if (user) {
      const userDocRef = doc(firestore, `users/${user.uid}`);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentAttempts = userData?.matching2_attempts || 0; // 0 if no attempts found
        // update attempts locally
        setAttempts(currentAttempts + 1);
        // update attempts to firestore
        await setDoc(
          userDocRef,
          { matching2_attempts: increment(1) },
          { merge: true },
        );
        // save activity data in firestore
        await addDoc(collection(firestore, `users/${user.uid}/activities`), {
          activityName: "Matching Activity 2",
          score: finalScore,
          matching2_attempts: currentAttempts + 1,
          timestamp: new Date(),
          elapsedTime: formatTime(seconds),
        });
        console.log("worked");
      }
    }
    //toast.success("Score submitted successfully!"); // show success message
  };

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameWon(true);
      handleStop();
      handleSave();
      console.log("hello1");
    }
  }, [matchedCards, totalCards]);

  const handleCardClick = (index: number) => {
    // Ignore clicks on matched cards
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

  const resetGame = (): void => {
    // Reset button functions
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
    const totalMoves = clickCount;
    const elapsedTime = seconds;
    const score = (12000 - totalMoves * 100 - elapsedTime * 10) / 2500;
    const calculateScore = (score:number) : number => {
    if (score >= 3) {
      return 3; // 3 stars
    } else if (score >= 2) {
      return 2; // 2 stars
    } else if (score >= 1) {
      return 1; // 1 star
    } else {
      return 0; // 0 star
    }
    //return Math.max(score,0);
  }
  const stars = calculateScore(score);

  return (
    <main>
      <div className="font-sans leading-normal tracking-normal text-[#132241]">
        {/* Navbar */}
        <Nav />
        
        <div className="flex min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#FAF9F6] text-[#434343]">
          <div className="container mx-auto max-w-3xl px-4 py-6">
            {/* Game Title */}
            <h1 className="mt-2 text-center text-7xl font-bold">
              Match the Tech!
            </h1>
            
            {/* Instructions */}
            <p className="mt-2 text-center text-xl">
              Instructions: Click on cards to match them.
            </p>
            
            {/* Start Game Button */}
            <div className="mx-auto max-w-[400px] sm:max-w-[600px]">
              {!gameStarted && (
                <button
                  className="mt-4 rounded-lg bg-[#ffe08d] px-6 py-4 text-xl shadow-md transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#ff914d] block mx-auto"
                  onClick={startGame}
                >
                  Start Game
                </button>
              )}
            </div>
            
            {/* Stats Component */}
            {gameStarted && (
              <div className="relative">
                {/* Game Header */}
                <div className="mt-4 flex justify-evenly">
                  {/* Click Count */}
                  <p className="cursor-none rounded-lg border-4 border-gray-300 bg-[#5c93ff] p-4 text-white">
                    Click Count: {clickCount}
                  </p>
                  {/* Timer */}
                  <p className="w-33 cursor-none rounded-lg border-4 border-gray-300 bg-[#5c93ff] p-4 text-white">
                    Timer: {formatTime(seconds)}
                  </p>
                </div>
                
                {/* Game Cards Section */}
                <div className="container mt-8 border-4 border-dashed border-[#5c93ff] bg-[#5ab2ff] px-4 py-4">
                  <section className="grid grid-cols-4 justify-items-center gap-4">
                    {cards.map((card, index) => (
                      <button
                        key={index}
                        className={`memory-card flex h-32 sm:h-40 w-32 sm:w-40 items-center justify-center rounded-lg bg-[#ff5a5f] text-white shadow-lg hover:bg-[#ff4146] focus:outline-none focus:ring focus:ring-black active:bg-[#ff4146] ${flippedCards.includes(index) || matchedCards.includes(index) ? "flipped" : ""}`}
                        onClick={() => handleCardClick(index)}
                        disabled={isDisabled || matchedCards.includes(index)}
                      >
                        {flippedCards.includes(index) ||
                        matchedCards.includes(index) ? (
                          <img
                            src={images[card]}
                            alt={`Card ${index}`}
                            className="w-full h-full"
                          />
                        ) : (
                          <img
                            src="https://cdn.discordapp.com/attachments/1196945767785578598/1205159897663279114/Screen_Shot_2024-02-08_at_9.34.52_AM.png?ex=65f30b1e&is=65e0961e&hm=0f846bd73ee4c0bb03c39dc0488456a41e7ab937acd0f0824327bd152cd18dc7&"
                            className="w-3/4 h-3/4"
                          />
                        )}
                      </button>
                    ))}
                  </section>
                </div>
                
                {/* Reset Game Button */}
                <div className="mt-4 flex justify-center">
                  <button
                    className="rounded bg-red-500 px-4 py-2 font-bold text-white shadow-md hover:bg-red-600"
                    onClick={resetGame}
                  >
                    Reset Game
                  </button>
                </div>
                
                {/* Stats Component */}
                <div className="absolute top-0 right-4 mt-4 md:mt-0 md:w-1/3 md:flex-shrink-0">
                  <Stats
                    attempts={matching2_attempts}
                    elapsedTime={elapsedTime}
                    score={(finalScore)}
                    renderStars={() => stars}
                  />
                </div>
                
                {/* Congrats Message */}
                {isGameWon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-lg bg-green-500 bg-opacity-90 p-8 text-white">
                      <div className="text-center text-6xl font-bold sm:text-7xl lg:text-8xl">
                        Great Job!
                        <div className="flex items-center justify-center animate-bounce">
                          {/* Flex container */}
                          <img
                            src="/CGimages/goodjob-man (1).png"
                            className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
                          />
                        </div>
                      </div>
                      <p className="rounded-lg bg-green-500 bg-opacity-60 p-1 text-center text-3xl text-white">
                        Score: {finalScore}
                      </p>
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
