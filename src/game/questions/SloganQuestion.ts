import { randomOrganization } from "../orgs/Organization";
import { generateChoices } from "./generateChoices";
import { MultiChoiceQuestion } from "./Question";

export function createSloganQuestion(): MultiChoiceQuestion {
  const org = randomOrganization();
  return {
    type: "multi-choice",
    question: `Mis on ${org.name} lipukiri?`,
    fontSize: "small",
    choices: generateChoices(org, (org) => org.slogan),
    validate: (slogan: string) => {
      if (slogan === org.slogan) {
        return { type: "praise", msg: "Õige! Oled hoolega tudeerinud. Tubli rebane!" };
      } else {
        return { type: "punish", msg: `Vale! ${org.name} lipukiri on ${org.slogan}. Jäta see endale meelde.` };
      }
    },
  };
}
