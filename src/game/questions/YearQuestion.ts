import { shuffle } from "lodash";
import { randomOrganization } from "../orgs/Organization";
import { MultiChoiceQuestion } from "./Question";

export function createYearQuestion(): MultiChoiceQuestion {
  const org = randomOrganization();
  return {
    type: "multi-choice",
    question: `Millisel aastal on asutatud ${org.name}?`,
    choices: generateChoices(org.establishedYear).map(String),
    validate: (year: string) => {
      if (year === String(org.establishedYear)) {
        return "Õige! Võta püksid maha.";
      } else {
        return `Vale! ${org.name} asutamisaasta on ${org.establishedYear}. Too endale shoppen vett.`;
      }
    },
  };
}

function generateChoices(year: number, count: number = 4): number[] {
  const choices = [year];
  while (choices.length < count) {
    const rndYear = randomOrganization().establishedYear;
    if (!choices.includes(rndYear)) {
      choices.push(rndYear);
    }
  }
  return shuffle(choices);
}
