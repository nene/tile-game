import { Organization } from "../orgs/Organization";
import { pickRandom } from "../utils/pickRandom";
import { generateChoices } from "./generateChoices";
import { MultiChoiceQuestion } from "./Question";

export function createPlaceQuestion(targetOrgs: Organization[], allOrgs: Organization[]): MultiChoiceQuestion {
  const org = pickRandom(targetOrgs);
  return {
    type: "multi-choice",
    category: "place",
    question: `Kus on asutatud ${org.name}?`,
    choices: generateChoices(allOrgs, org, (org) => org.establishedPlace),
    validate: (establishedPlace: string) => {
      if (establishedPlace === org.establishedPlace) {
        return { type: "praise", msg: "Õige vastus! Oled tubli." };
      } else {
        return { type: "punish", msg: `Vale puha! ${org.name} asutamiskoht on ${org.establishedPlace}.\nVõta laituseks sisse.` };
      }
    },
  };
}
