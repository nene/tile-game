interface HistoryQuestion {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export const questions: HistoryQuestion[] = [
  {
    question: "Kelle vahel toimus Fraternitas Estica esimene duell?",
    correctAnswer: "Arnold Lauri ja ülikooli rektori vahel.",
    wrongAnswers: [
      "Aleksander Paldroki ja Heinrich Rosenthali vahel.",
      "Karl Ploomi ja Jaan Treumanni vahel.",
      "Moritz Rose ja Jaan Putniku vahel.",
    ],
  }
];
