import { random } from "lodash";

export function pickRandom<T>(items: T[]): T {
  return items[random(items.length - 1)];
}
