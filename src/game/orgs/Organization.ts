import { FlagColor, makeFlag } from "./FlagColors";

export interface Organization {
  name: string;
  flag: FlagColor[];
  establishedYear: number;
}

const orgDef = (org: Organization) => org;

const orgs = {
  vironia: orgDef({
    name: "Vironia",
    flag: makeFlag("violett", "must", "valge"),
    establishedYear: 1900,
  }),
  estica: orgDef({
    name: "Fraternitas Estica",
    flag: makeFlag("sinine", "roheline", "valge"),
    establishedYear: 1907,
  }),
  sakala: orgDef({
    name: "Sakala",
    flag: makeFlag("sinine", "violett", "valge"),
    establishedYear: 1909,
  }),
  ugala: orgDef({
    name: "Ugala",
    flag: makeFlag("must", "sinine", "valge"),
    establishedYear: 1913,
  }),
  rotalia: orgDef({
    name: "Rotalia",
    flag: makeFlag("sinine", "must", "roheline"),
    establishedYear: 1913,
  }),
  liviensis: orgDef({
    name: "Fraternitas Liviensis",
    flag: makeFlag("violett", "roheline", "valge"),
    establishedYear: 1918,
  }),
  leola: orgDef({
    name: "Leola",
    flag: makeFlag("violett", "kollane", "valge"),
    establishedYear: 1920,
  }),
  revelia: orgDef({
    name: "Revelia",
    flag: makeFlag("roheline", "must", "valge"),
    establishedYear: 1920,
  }),
  tehnola: orgDef({
    name: "Tehnola",
    flag: makeFlag("must", "roheline", "valge"),
    establishedYear: 1921,
  }),
  tartuensis: orgDef({
    name: "Fraternitas Tartuensis",
    flag: makeFlag("roheline", "valge", "violett"),
    establishedYear: 1929,
  }),
  arminia: orgDef({
    name: "Arminia Dorpatensis",
    flag: makeFlag("must", "valge", "kuldne"),
    establishedYear: 1994,
  }),
  filiaePatriae: orgDef({
    name: "Filiae Patriae",
    flag: makeFlag("valge", "punane", "roheline"),
    establishedYear: 1920,
  }),
  indla: orgDef({
    name: "Indla",
    flag: makeFlag("kirsipruun", "valge", "roheline"),
    establishedYear: 1924,
  }),
  lembela: orgDef({
    name: "Lembela",
    flag: makeFlag("helebeez", "roheline", "violett"),
    establishedYear: 1924,
  }),
  amicitia: orgDef({
    name: "Amicitia",
    flag: makeFlag("lilla", "roheline", "kuldne"),
    establishedYear: 1924,
  }),
  sororitasEstoniae: orgDef({
    name: "Sororitas Estoniae",
    flag: makeFlag("valge", "roosa", "must"),
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
