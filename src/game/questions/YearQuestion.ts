import { randomOrganization } from "../orgs/Organization";
import { generateChoices } from "./generateChoices";
import { MultiChoiceQuestion } from "./Question";

export function createYearQuestion(): MultiChoiceQuestion {
  const org = randomOrganization();
  return {
    type: "multi-choice",
    question: `Millisel aastal on asutatud ${org.name}?`,
    choices: generateChoices(org, (org) => String(org.establishedYear)),
    validate: (year: string) => {
      if (year === String(org.establishedYear)) {
        return "Õige! Võta püksid maha.";
      } else {
        return `Vale! ${org.name} asutamisaasta on ${org.establishedYear}. Too endale shoppen vett.`;
      }
    },
  };
}
