import { isEqual } from "lodash";
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
      } else {
        return `Vale!\n${org.name} värvid on ${colorsString(org.colors)}.\nVõta laituseks sisse.`;
      }
    },
  }
}

function colorsString(colors: FlagColor[]): string {
  return colors.map((c) => c.name).join("-");
}
