import { shuffle } from "lodash";
import { randomOrganization } from "../orgs/Organization";
import { MultiChoiceQuestion } from "./Question";

export function createSloganQuestion(): MultiChoiceQuestion {
  const org = randomOrganization();
  return {
    type: "multi-choice",
    question: `Mis on ${org.name} lipukiri?`,
    fontSize: "small",
    choices: generateChoices(org.slogan),
    validate: (slogan: string) => {
      if (slogan === org.slogan) {
        return "Õige! Oled hoolega tudeerinud. Tubli rebane!";
      } else {
        return `Vale! ${org.name} lipukiri on ${org.slogan}. Jäta see endale meelde.`;
      }
    },
  };
}

function generateChoices(slogan: string, count: number = 4): string[] {
  const choices = [slogan];
  while (choices.length < count) {
    const rndSlogan = randomOrganization().slogan;
    if (!choices.includes(rndSlogan)) {
      choices.push(rndSlogan);
    }
  }
  return shuffle(choices);
}
