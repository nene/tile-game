import { shuffle } from "lodash";
import { pickRandom } from "../utils/pickRandom";
import { MultiChoiceQuestion } from "./Question";

export function createTerminologyQuestion(): MultiChoiceQuestion {
  const { question, correctAnswer, wrongAnswers } = pickRandom(questions);
  return {
    type: "multi-choice",
    category: "terminology",
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
    question: "Kes on ruktoonus?",
    correctAnswer: "Isik kellel on korporatsiooniga läbikäimine keelatud.",
    wrongAnswers: [
      "Korp! Ruktonia liige.",
      "Värske värvikandja.",
      "Värvide saamise üle otsustava koosoleku liige.",
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
  {
    question: "Mis on kaatripäev?",
    correctAnswer: "Tervist taastav koosviibimine peale kommerssi või muud suuremat pidu.",
    wrongAnswers: [
      "Fraateri matustele järgnev koosviibimine konvendis.",
      "Päev, mil konvendis on lubatud raha peale kaartide mängimine.",
      "Iga-aastane laevasõit emajõel.",
    ],
  },
  {
    question: "Mis on comment suspendu?",
    correctAnswer: "Ootele pandud auvahekord.",
    wrongAnswers: [
      "Alkoholi tarbimise keeld.",
      "Luba õllelauast lahkuda.",
      "Vaikimiskohustus.",
    ],
  },
  {
    question: "Mis on küüneproov?",
    correctAnswer: "Šoppeni tühjuse kontroll.",
    wrongAnswers: [
      "Kaasvõitlejate maniküüri ülevaatus.",
      "Rebasteatri proovietendus.",
      "Laua ettevalmistus enne kvarterimängu viset.",
    ],
  },
  {
    question: "Mis on coetus-šlukk?",
    correctAnswer: "Con-coetorite ühine laulmine peale vennastuspidu.",
    wrongAnswers: [
      "Eriline jook, mida valmistatakse põleva piirituse ja laulu saatel.",
      "Tervele coetusele sisse andmine.",
      "Coetuse liikmete ühte hoidmise põhimõte.",
    ],
  },
  {
    question: "Mitmendat semestrit käib noormaja?",
    correctAnswer: "1. ja 2. semestrit.",
    wrongAnswers: [
      "3. ja 4. semestrit.",
      "5. ja 6. semestrit.",
      "7. ja 8. semestrit.",
    ],
  },
  {
    question: "Kuidas nimetatakse 6. semestrit liige olijat?",
    correctAnswer: "Vanamaja.",
    wrongAnswers: [
      "Väga-vanamaja.",
      "Noormaja.",
      "Sammalpea.",
    ],
  },
  {
    question: "Kuidas nimetatakse 7. semstrit liige olijat.",
    correctAnswer: "Väga-vanamaja.",
    wrongAnswers: [
      "Vanamaja.",
      "Väga-sammalpea.",
      "Sammalpea.",
    ],
  },
  {
    question: "Mitmendat semestrit käib sammalpea?",
    correctAnswer: "9. ja 10. semestrit.",
    wrongAnswers: [
      "7. ja 8. semestrit.",
      "5. ja 6. semestrit.",
      "3. ja 4. semestrit.",
    ],
  },
  {
    question: "Kuidas nimetatakse 11. semstrit liige olijat.",
    correctAnswer: "Väga-sammalpea.",
    wrongAnswers: [
      "Sammalpea.",
      "Kuldrebane.",
      "Vanamees.",
    ],
  },
  {
    question: "Kui vana on kuldrebane?",
    correctAnswer: "13 või rohkem semestrit.",
    wrongAnswers: [
      "12 või rohkem semestrit.",
      "10 või rohkem semestrit.",
      "11 või rohkem semestrit.",
    ],
  },
];
