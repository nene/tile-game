import { allOrganizations } from "../orgs/Organization";
import { pickRandom } from "../utils/pickRandom";
import { generateChoices } from "./generateChoices";
import { MultiChoiceQuestion } from "./Question";

export function createSloganQuestion(): MultiChoiceQuestion {
  const orgsWithSlogans = allOrganizations().filter((org) => org.slogan !== "???");
  const org = pickRandom(orgsWithSlogans);
  return {
    type: "multi-choice",
    question: `Mis on ${org.name} lipukiri?`,
    fontSize: "small",
    choices: generateChoices(orgsWithSlogans, org, (org) => org.slogan),
    validate: (slogan: string) => {
      if (slogan === org.slogan) {
        return { type: "praise", msg: "Õige! Oled hoolega tudeerinud. Tubli rebane!" };
      } else {
        return { type: "punish", msg: `Vale! ${org.name} lipukiri on ${org.slogan}. Jäta see endale meelde.` };
      }
    },
  };
}
