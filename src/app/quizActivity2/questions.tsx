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
        question: "It is safe to give friends your password",
        options: [
            {text: "True", isCorrect: false},
            {text: "False", isCorrect: true},
        ],
    },
    {
        question: "'Password123' is a weak password",
        options: [
            {text: "True", isCorrect: true},
            {text: "False", isCorrect: false},
        ],
    },
    {
        question: "True or False? This is a power button",
        image:"https://i.imgur.com/akxY9Dq.png",
        options: [
            {text: "True", isCorrect: true},
            {text: "False", isCorrect: false},
        ],
    },
    {
        question: "What is this called?",
        image: "https://i.imgur.com/bouAlsV.png",
        options: [
            {text: "TV", isCorrect: false},
            {text: "Window", isCorrect: false},
            {text: "Monitor", isCorrect: true},
            {text: "Phone", isCorrect: false},
        ],
    },
  ];
  