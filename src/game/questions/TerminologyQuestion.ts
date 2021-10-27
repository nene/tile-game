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
    correctAnswer: "Äsja ülikooli lõpetanud fraaterite korraldatud pidu.",
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
  {
    question: "Mis on juhtsimine?",
    correctAnswer: "Karistus liikmemaksu tasumata jätmise eest.",
    wrongAnswers: [
      "Ühest kuni 99 aastaks konvendist välja arvamine.",
      "Rapiiriteraga tekli läbistamine vennastuspeol.",
      "Rebase põhjuseta lahkunuks lugemine.",
    ],
  },
  {
    question: "Mis on rebaste raseerimise õigus?",
    correctAnswer: "Rebaste õigus vennastuse ajal veini pihta panna.",
    wrongAnswers: [
      "Vanamehe õigus rebasteid ebasobiliku soengu eest karistada.",
      "Õigus peale värvide saamist akadeemilisele emale sisse anda.",
      "Rebaste õigus õllelauas magama jäänud fraateril habe maha ajada.",
    ],
  },
  {
    question: "Mis on trisna?",
    correctAnswer: "Fraateri matustele järgnev koosviibimine konvendis.",
    wrongAnswers: [
      "Pidulik rongkäik volbri ja ülikooli aastapäeva ajal.",
      "Äsja ülikooli lõpetanud fraaterite korraldatud pidu.",
      "Korporatsioonist määramata ajaks välja heitmine.",
    ],
  },
  {
    question: "Mis on pluserdamine?",
    correctAnswer: "Konvendi vara tahtlik lõhkumine.",
    wrongAnswers: [
      "Karistus liikmemaksu tasumata jätmise eest.",
      "Con-coetorite ühine laulmine peale vennastuspidu.",
      "Metsikute külaliste konventi toomine.",
    ],
  },
];
