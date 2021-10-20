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
        return "Õige! Oled hoolega tudeerinud. Tubli rebane!";
      } else {
        return `Vale! ${org.name} lipukiri on ${org.slogan}. Jäta see endale meelde.`;
      }
    },
  };
}
