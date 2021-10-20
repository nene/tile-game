import { shuffle } from "lodash";
import { Organization, randomOrganization } from "../orgs/Organization";

type GetOrgProperty = (org: Organization) => string;

export function generateChoices(org: Organization, getProperty: GetOrgProperty, count: number = 4): string[] {
  const choices = [getProperty(org)];
  while (choices.length < count) {
    const rndSlogan = getProperty(randomOrganization());
    if (!choices.includes(rndSlogan)) {
      choices.push(rndSlogan);
    }
  }
  return shuffle(choices);
}