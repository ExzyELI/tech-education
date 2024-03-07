"use client";
export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  options: Option[];
  image?: string;
}

export const questions: Question[] = [
  {
    question: "What does the caps lock key do?",
    options: [
      { text: "Lets you type numbers instead of letters", isCorrect: false },
      { text: "Changes the size of your screen", isCorrect: false },
      { text: "Changes the brightness of your screen", isCorrect: false },
      { text: "Changes the case of the letters you type", isCorrect: true },
    ],
  },
  {
    question: "True or False? It is safe to send strangers your password",
    options: [
      { text: "True", isCorrect: false },
      { text: "False", isCorrect: true },
    ],
  },
  {
    question: "True or False? It is safe to post personal information online",
    options: [
      { text: "True", isCorrect: false },
      { text: "False", isCorrect: true },
    ],
  },
  {
    question: "What does this button do?",
    image: "https://i.imgur.com/DD5Iid2.png",
    options: [
      { text: "Turns off the computer", isCorrect: false },
      { text: "Closes the window", isCorrect: true },
      { text: "Opens a new window", isCorrect: false },
      { text: "Makes the window smaller", isCorrect: false },
    ],
  },
];
