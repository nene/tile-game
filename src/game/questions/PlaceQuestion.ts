import { allOrganizations } from "../orgs/Organization";
import { pickRandom } from "../utils/pickRandom";
import { generateChoices } from "./generateChoices";
import { MultiChoiceQuestion } from "./Question";

export function createPlaceQuestion(): MultiChoiceQuestion {
  const org = pickRandom(allOrganizations());
  return {
    type: "multi-choice",
    question: `Kus on asutatud ${org.name}?`,
    choices: generateChoices(allOrganizations(), org, (org) => org.establishedPlace),
    validate: (establishedPlace: string) => {
      if (establishedPlace === org.establishedPlace) {
        return { type: "praise", msg: "Õige vastus! Oled tubli." };
      } else {
        return { type: "punish", msg: `Vale puha! ${org.name} asutamiskoht on ${org.establishedPlace}.\nVõta laituseks sisse.` };
      }
    },
  };
}
