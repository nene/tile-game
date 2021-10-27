import { shuffle } from "lodash";
import { pickRandom } from "../utils/pickRandom";
import { MultiChoiceQuestion } from "./Question";

export function createTerminologyQuestion(): MultiChoiceQuestion {
  const { question, correctAnswer, wrongAnswers } = pickRandom(questions);
  return {
    type: "multi-choice",
    question: question,
    fontSize: "small",
    choices: shuffle([correctAnswer, ...wrongAnswers]),
    validate: (answer: string) => {
      if (answer === correctAnswer) {
        return { type: "praise", msg: "Õige! Oled hoolega tudeerinud. Tubli rebane!" };
      } else {
        return { type: "punish", msg: `Vale puha. Õige vastus on: ${correctAnswer}\nToo endale shoppen vett.` };
      }
    },
  };
}

interface TerminologyQuestion {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

const questions: TerminologyQuestion[] = [
  {
    question: "Mis on komitaat?",
    correctAnswer: "Ülikooli lõpetamise tähistamine.",
    wrongAnswers: [
      "Fraateri matustele järgnev koosviibimine konvendis.",
      "Kohustuslik rebaste vehklemistund.",
      "Tervist taastav koosviibimine peale kommerssi või muud suuremat pidu.",
    ],
  },
  {
    question: "Mis on lakkimine?",
    correctAnswer: "Karistuseks määratud värvide kandmise keeld.",
    wrongAnswers: [
      "Eestseisuse liikmeks valimine.",
      "Rebasest noormajaks saamise rituaal.",
      "Akadeemilisele emale õllest kangema joogiga sisse andmine.",
    ],
  },
  {
    question: "Mis on stehhimine?",
    correctAnswer: "Rapiiriteraga tekli läbistamine vennastuspeol.",
    wrongAnswers: [
      "Karistus liikmemaksu tasumata jätmise eest.",
      "Karistuseks määratud värvide kandmise keeld.",
      "Vilistlaskokku vastuvõtmine.",
    ],
  },
];
