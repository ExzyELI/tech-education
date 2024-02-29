"use client";
import {useState} from "react";
import {questions} from "./questions";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";


export default function Quiz(){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [guessedRight, setGuessedRight] = useState<Array<boolean | null>>(
        Array(questions.length).fill(null)
      );

    const handleButtonClick = (isCorrect: boolean) => {
        const updatedGuessedRight = guessedRight.map((value, index) =>
            index === currentQuestion ? isCorrect : value
        );
        setGuessedRight(updatedGuessedRight);
        setShowAnswer(true);
  
        if (isCorrect) {
            setScore(score + 1);
        }
    
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setTimeout(() => {
            setCurrentQuestion(nextQuestion);
            setShowAnswer(false);
            }, 1000); // Delaying for 1 second before moving to the next question
        }
    };

    return (
      <main className="font-family: flex min-h-screen flex-col space-y-[110px] bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
        <title>Tech Education</title>
        <Nav />
        <div className="max-w-lg mx-auto">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 mt-5">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="border-4 border-[#afce8b] font-semibold p-3 w-full rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3">
              {questions[currentQuestion].question}
            </p>
          </div>
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`px-12 py-4 mb-2 bg-gray-300 text-black text-lg rounded-lg hover:bg-gray-200 transition w-full ${
                  showAnswer && option.isCorrect
                    ? "bg-green-300 hover:bg-green-300"
                    : showAnswer && !option.isCorrect
                    ? "bg-red-300 hover:bg-red-300"
                    : ""
                }`}
                onClick={() => handleButtonClick(option.isCorrect)}
                disabled={showAnswer}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="mt-4">
          <div className="flex justify-center my-4">
            {questions.map((question, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded text-white mx-1 text-center text-xs flex items-center justify-center ${
                guessedRight[i] === true
                    ? "bg-green-300"
                    : guessedRight[i] === false
                    ? "bg-red-300"
                    : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
          </div>
          <p className="mt-2 text-center font-semibold">Score: {score}</p>
        </div>
        <Footer />
      </main>
    );
  };


