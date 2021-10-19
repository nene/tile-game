import { MultiChoiceQuestion } from "./Question";

export function createYearQuestion(): MultiChoiceQuestion {
  return {
    type: "multi-choice",
    question: "Millisel aastal on asutatud Vironia?",
    choices: ["1981", "1900", "1907", "1914"],
    validate: (year: string) => {
      if (year === "1900") {
        return "Õige! Võta püksid maha.";
      } else {
        return "Vale! Vironia asutamisaasta on 1900. Too endale shoppen vett.";
      }
    },
  };
}
