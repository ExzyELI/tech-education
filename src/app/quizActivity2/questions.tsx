"use client";
export interface Option {
  text: string;
  isCorrect: boolean;
  image?: string;
}

export interface Question {
  question: string;
  options: Option[];
  image?: string;
}

export const questions: Question[] = [
  {
    question: "What part is the heart of the computer?",
    options: [
      { text: "TikTok", isCorrect: false },
      { text: "Keyboard", isCorrect: false },
      { text: "CPU", isCorrect: true },
      { text: "Desktop", isCorrect: false },
    ],
  },
  {
    question: "'Password123' is a weak password.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false },
    ],
  },
  {
    question: "What are the buttons on a keyboard called?",
    options: [
      { text: "Arrows", isCorrect: false },
      { text: "Numbers", isCorrect: false },
      { text: "Letters", isCorrect: false },
      { text: "Keys", isCorrect: true },
    ],
  },
  {
    question: "Parts of a computer that you can touch are called?",
    options: [
      { text: "Software", isCorrect: false },
      { text: "Hardware", isCorrect: true },
      { text: "Internet", isCorrect: false },
      { text: "Netflix", isCorrect: false },
    ],
  },
];
