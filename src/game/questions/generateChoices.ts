import { shuffle } from "lodash";
import { Organization } from "../orgs/Organization";
import { pickRandom } from "../utils/pickRandom";

type GetOrgProperty = (org: Organization) => string;

export function generateChoices(orgs: Organization[], org: Organization, getProperty: GetOrgProperty, count: number = 4): string[] {
  const choices = [getProperty(org)];
  while (choices.length < count) {
    const rndSlogan = getProperty(pickRandom(orgs));
    if (!choices.includes(rndSlogan)) {
      choices.push(rndSlogan);
    }
  }
  return shuffle(choices);
}
