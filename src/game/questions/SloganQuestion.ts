import { Organization } from "../orgs/Organization";
import { pickRandom } from "../utils/pickRandom";
import { generateChoices } from "./generateChoices";
import { MultiChoiceQuestion } from "./Question";

export function createSloganQuestion(targetOrgs: Organization[], allOrgs: Organization[]): MultiChoiceQuestion {
  const org = pickRandom(targetOrgs.filter(isOrgWithSlogan));
  return {
    type: "multi-choice",
    category: "slogan",
    question: `Mis on ${org.name} lipukiri?`,
    fontSize: "small",
    choices: generateChoices(allOrgs.filter(isOrgWithSlogan), org, (org) => org.slogan),
    validate: (slogan: string) => {
      if (slogan === org.slogan) {
        return { type: "praise", msg: "Õige! Oled hoolega tudeerinud. Tubli rebane!" };
      } else {
        return { type: "punish", msg: `Vale! ${org.name} lipukiri on ${org.slogan}. Jäta see endale meelde.` };
      }
    },
  };
}

const isOrgWithSlogan = (org: Organization): org is Organization & { slogan: string } => Boolean(org.slogan);
