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
  rotalia: orgDef({
    name: "Rotalia",
    flag: makeFlag("sinine", "must", "roheline"),
  }),
  liviensis: orgDef({
    name: "Fraternitas Liviensis",
    flag: makeFlag("violett", "roheline", "valge"),
  }),
  leola: orgDef({
    name: "Leola",
    flag: makeFlag("violett", "kollane", "valge"),
  }),
  revelia: orgDef({
    name: "Revelia",
    flag: makeFlag("roheline", "must", "valge"),
  }),
  tehnola: orgDef({
    name: "Tehnola",
    flag: makeFlag("must", "roheline", "valge"),
  }),
  tartuensis: orgDef({
    name: "Fraternitas Tartuensis",
    flag: makeFlag("roheline", "valge", "violett"),
  }),
  arminia: orgDef({
    name: "Arminia Dorpatensis",
    flag: makeFlag("must", "valge", "kuldne"),
  }),
  filiaePatriae: orgDef({
    name: "Filiae Patriae",
    flag: makeFlag("valge", "punane", "roheline"),
  }),
  indla: orgDef({
    name: "Indla",
    flag: makeFlag("kirsipruun", "valge", "roheline"),
  }),
  lembela: orgDef({
    name: "Lembela",
    flag: makeFlag("helebeez", "roheline", "violett"),
  }),
  amicitia: orgDef({
    name: "Amicitia",
    flag: makeFlag("lilla", "roheline", "kuldne"),
  }),
  sororitasEstoniae: orgDef({
    name: "Sororitas Estoniae",
    flag: makeFlag("valge", "roosa", "must"),
  }),
};

export type OrgName = keyof typeof orgs;

export function getOrg(name: OrgName): Organization {
  return orgs[name];
}

export function allOrganizations(): Organization[] {
  return Object.values(orgs);
}
