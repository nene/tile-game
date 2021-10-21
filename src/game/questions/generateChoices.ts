import { shuffle } from "lodash";
import { pickRandom } from "../utils/pickRandom";

type GetProperty<T> = (org: T) => string;

export function generateChoices<T>(orgs: T[], org: T, getProperty: GetProperty<T>, count: number = 4): string[] {
  const choices = [getProperty(org)];
  while (choices.length < count) {
    const rndSlogan = getProperty(pickRandom(orgs));
    if (!choices.includes(rndSlogan)) {
      choices.push(rndSlogan);
    }
  }
  return shuffle(choices);
}
