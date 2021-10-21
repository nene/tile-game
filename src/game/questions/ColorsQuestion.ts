import { isEqual, sortBy } from "lodash";
import { FlagColor } from "../orgs/FlagColors";
import { allOrganizations } from "../orgs/Organization";
import { pickRandom } from "../utils/pickRandom";
import { ColorsQuestion } from "./Question";

export function createColorsQuestion(): ColorsQuestion {
  const org = pickRandom(allOrganizations());
  return {
    type: "colors",
    question: `Millised on ${org.name} värvid?`,
    validate: (colors: FlagColor[]) => {
      if (org.colors.length === 0) {
        if (colors.length === 0) {
          return { type: "praise", msg: "Õige!\nSee oli trikiga küsimus, sellel organisatsioonil polegi värve." };
        } else {
          return { type: "punish", msg: `See oli trikiga küsimus, ${org.name} värve ei oma.\nVõta laituseks sisse!` };
        }
      }

      if (isEqual(colors, org.colors)) {
        return { type: "praise", msg: "Õige!\nTubli rebane. Kiidan." };
      } else if (isEqual(sortColors(colors), sortColors(org.colors))) {
        return { type: "neutral", msg: `Õiged värvid, aga vale järjekord.\nÕige on ${colorsString(org.colors)}. Pead veel pingutama.` };
      } else {
        return { type: "punish", msg: `Vale!\n${org.name} värvid on ${colorsString(org.colors)}.\nVõta laituseks sisse.` };
      }
    },
  }
}

function sortColors(colors: FlagColor[]): FlagColor[] {
  return sortBy(colors, (c) => c.name);
}

function colorsString(colors: FlagColor[]): string {
  return colors.map((c) => c.name).join("-");
}
