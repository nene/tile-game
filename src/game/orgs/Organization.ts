import { FlagColor, makeFlag } from "./FlagColors";

export interface Organization {
  name: string;
  flag: FlagColor[];
}

const orgDef = (org: Organization) => org;

const orgs = {
  vironia: orgDef({
    name: "Vironia",
    flag: makeFlag("violett", "must", "valge"),
  }),
  estica: orgDef({
    name: "Fraternitas Estica",
    flag: makeFlag("sinine", "roheline", "valge"),
  }),
  sakala: orgDef({
    name: "Sakala",
    flag: makeFlag("sinine", "violett", "valge"),
  }),
  ugala: orgDef({
    name: "Ugala",
    flag: makeFlag("must", "sinine", "valge"),
  }),
};

export type OrgName = keyof typeof orgs;

export function getOrg(name: OrgName): Organization {
  return orgs[name];
}
