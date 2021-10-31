import { Organization } from "../orgs/Organization";
import { pickRandom } from "../utils/pickRandom";
import { generateChoices } from "./generateChoices";
import { MultiChoiceQuestion } from "./Question";

export function createYearQuestion(targetOrgs: Organization[], allOrgs: Organization[]): MultiChoiceQuestion {
  const org = pickRandom(targetOrgs);
  return {
    type: "multi-choice",
    category: "year",
    question: `Millisel aastal on asutatud ${org.name}?`,
    choices: generateChoices(allOrgs, org, (org) => String(org.establishedYear)),
    validate: (year: string) => {
      if (year === String(org.establishedYear)) {
        return { type: "praise", msg: "Õige! Võta püksid maha." };
      } else {
        return { type: "punish", msg: `Vale! ${org.name} asutamisaasta on ${org.establishedYear}. Too endale shoppen vett.` };
      }
    },
  };
}
