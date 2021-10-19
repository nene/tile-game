import { random } from "lodash";
import { FlagColor, makeFlag } from "./FlagColors";

export interface Organization {
  name: string;
  colors: FlagColor[];
  establishedYear: number;
}

const orgDef = (org: Organization) => org;

const orgs = {
  vironia: orgDef({
    name: "Vironia",
    colors: makeFlag("violett", "must", "valge"),
    establishedYear: 1900,
  }),
  estica: orgDef({
    name: "Fraternitas Estica",
    colors: makeFlag("sinine", "roheline", "valge"),
    establishedYear: 1907,
  }),
  sakala: orgDef({
    name: "Sakala",
    colors: makeFlag("sinine", "violett", "valge"),
    establishedYear: 1909,
  }),
  ugala: orgDef({
    name: "Ugala",
    colors: makeFlag("must", "sinine", "valge"),
    establishedYear: 1913,
  }),
  rotalia: orgDef({
    name: "Rotalia",
    colors: makeFlag("sinine", "must", "roheline"),
    establishedYear: 1913,
  }),
  liviensis: orgDef({
    name: "Fraternitas Liviensis",
    colors: makeFlag("violett", "roheline", "valge"),
    establishedYear: 1918,
  }),
  leola: orgDef({
    name: "Leola",
    colors: makeFlag("violett", "kollane", "valge"),
    establishedYear: 1920,
  }),
  revelia: orgDef({
    name: "Revelia",
    colors: makeFlag("roheline", "must", "valge"),
    establishedYear: 1920,
  }),
  tehnola: orgDef({
    name: "Tehnola",
    colors: makeFlag("must", "roheline", "valge"),
    establishedYear: 1921,
  }),
  tartuensis: orgDef({
    name: "Fraternitas Tartuensis",
    colors: makeFlag("roheline", "valge", "violett"),
    establishedYear: 1929,
  }),
  arminia: orgDef({
    name: "Arminia Dorpatensis",
    colors: makeFlag("must", "valge", "kuldne"),
    establishedYear: 1994,
  }),
  filiaePatriae: orgDef({
    name: "Filiae Patriae",
    colors: makeFlag("valge", "punane", "roheline"),
    establishedYear: 1920,
  }),
  indla: orgDef({
    name: "Indla",
    colors: makeFlag("kirsipruun", "valge", "roheline"),
    establishedYear: 1924,
  }),
  lembela: orgDef({
    name: "Lembela",
    colors: makeFlag("helebeez", "roheline", "violett"),
    establishedYear: 1924,
  }),
  amicitia: orgDef({
    name: "Amicitia",
    colors: makeFlag("lilla", "roheline", "kuldne"),
    establishedYear: 1924,
  }),
  sororitasEstoniae: orgDef({
    name: "Sororitas Estoniae",
    colors: makeFlag("valge", "roosa", "must"),
    establishedYear: 2011,
  }),
};

export type OrgName = keyof typeof orgs;

export function getOrg(name: OrgName): Organization {
  return orgs[name];
}

export function allOrganizations(): Organization[] {
  return Object.values(orgs);
}

export function randomOrganization(): Organization {
  const orgs = allOrganizations();
  return orgs[random(orgs.length - 1)];
}
