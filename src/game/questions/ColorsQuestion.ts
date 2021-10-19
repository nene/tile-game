import { isEqual, sortBy } from "lodash";
import { FlagColor } from "../orgs/FlagColors";
import { randomOrganization } from "../orgs/Organization";
import { ColorsQuestion } from "./Question";

export function createColorsQuestion(): ColorsQuestion {
  const org = randomOrganization();
  return {
    type: "colors",
    question: `Millised on ${org.name} värvid?`,
    validate: (colors: FlagColor[]) => {
      if (isEqual(colors, org.colors)) {
        return "Õige!\nTubli rebane. Kiidan.";
      } else if (isEqual(sortColors(colors), sortColors(org.colors))) {
        return `Õiged värvid, aga vale järjekord.\nÕige on ${colorsString(org.colors)}. Pead veel pingutama.`;
      } else {
        return `Vale!\n${org.name} värvid on ${colorsString(org.colors)}.\nVõta laituseks sisse.`;
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
