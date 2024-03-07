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
        question: "What is this called?",
        image:"https://i.imgur.com/8ndFReG.png",
        options: [
            {text: "Button", isCorrect: false},
            {text: "Cursor", isCorrect: true},
            {text: "Letter", isCorrect: false},
            {text: "Number", isCorrect: false},
        ],
    },
    {
        question: "What is this called?",
        image:"https://i.imgur.com/ZnSVJHO.jpeg",
        options: [
            {text: "Keyboard", isCorrect: true},
            {text: "Screen", isCorrect: false},
            {text: "Mouse", isCorrect: false},
            {text: "Speaker", isCorrect: false},
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
  