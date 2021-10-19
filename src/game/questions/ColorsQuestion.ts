import { isEqual, random } from "lodash";
import { FlagColor } from "../orgs/FlagColors";
import { allOrganizations, Organization } from "../orgs/Organization";
import { ColorsQuestion } from "./Question";

export function createColorsQuestion(): ColorsQuestion {
  const org = chooseOrg();
  return {
    type: "colors",
    question: `Millised on ${org.name} värvid?`,
    validate: (colors: FlagColor[]) => {
      if (isEqual(colors, org.flag)) {
        return "Õige!\nTubli rebane. Kiidan.";
      } else {
        return `Vale!\n${org.name} värvid on ${colorsString(org.flag)}.\nVõta laituseks sisse.`;
      }
    },
  }
}

function chooseOrg(): Organization {
  const orgs = allOrganizations();
  return orgs[random(orgs.length - 1)];
}

function colorsString(colors: FlagColor[]): string {
  return colors.map((c) => c.name).join("-");
}
