import { random } from "lodash";
import { FlagColor, makeFlag } from "./FlagColors";

export interface Organization {
  name: string;
  colors: FlagColor[];
  establishedYear: number;
  slogan: string;
}

const orgDef = (org: Organization) => org;

const orgs = {
  vironia: orgDef({
    name: "Vironia",
    colors: makeFlag("violett", "must", "valge"),
    establishedYear: 1900,
    slogan: "Ühisus, kindlus, ausus",
  }),
  estica: orgDef({
    name: "Fraternitas Estica",
    colors: makeFlag("sinine", "roheline", "valge"),
    establishedYear: 1907,
    slogan: "Teos õiglane ja vahvas, ustav sulle, Eesti rahvas",
  }),
  sakala: orgDef({
    name: "Sakala",
    colors: makeFlag("sinine", "violett", "valge"),
    establishedYear: 1909,
    slogan: "Üks kõigi eest, kõik ühe eest",
  }),
  ugala: orgDef({
    name: "Ugala",
    colors: makeFlag("must", "sinine", "valge"),
    establishedYear: 1913,
    slogan: "Isamaa, sõprus, ausus",
  }),
  rotalia: orgDef({
    name: "Rotalia",
    colors: makeFlag("sinine", "must", "roheline"),
    establishedYear: 1913,
    slogan: "Eestimaa, mu isamaa",
  }),
  liviensis: orgDef({
    name: "Fraternitas Liviensis",
    colors: makeFlag("violett", "roheline", "valge"),
    establishedYear: 1918,
    slogan: "Vendlus, ausus, hoolsus",
  }),
  leola: orgDef({
    name: "Leola",
    colors: makeFlag("violett", "kollane", "valge"),
    establishedYear: 1920,
    slogan: "Age quod agis",
  }),
  revelia: orgDef({
    name: "Revelia",
    colors: makeFlag("roheline", "must", "valge"),
    establishedYear: 1920,
    slogan: "Üks kõige, kõik ühe eest",
  }),
  tehnola: orgDef({
    name: "Tehnola",
    colors: makeFlag("must", "roheline", "valge"),
    establishedYear: 1921,
    slogan: "Kindlus, ausus, vendlus",
  }),
  tartuensis: orgDef({
    name: "Fraternitas Tartuensis",
    colors: makeFlag("roheline", "valge", "violett"),
    establishedYear: 1929,
    slogan: "Pidevas töös tõe valguses elurõõmsalt tulevikku",
  }),
  arminia: orgDef({
    name: "Arminia Dorpatensis",
    colors: makeFlag("must", "valge", "kuldne"),
    establishedYear: 1994,
    slogan: "Jumal, vabadus, isamaa",
  }),
  filiaePatriae: orgDef({
    name: "Filiae Patriae",
    colors: makeFlag("valge", "punane", "roheline"),
    establishedYear: 1920,
    slogan: "Eesti tütar, Eesti kodu, tugevasti seotud olgu",
  }),
  indla: orgDef({
    name: "Indla",
    colors: makeFlag("kirsipruun", "valge", "roheline"),
    establishedYear: 1924,
    slogan: "Sõnasse kindlust, teosse ausust, kodule armastust",
  }),
  lembela: orgDef({
    name: "Lembela",
    colors: makeFlag("helebeez", "roheline", "violett"),
    establishedYear: 1924,
    slogan: "Constantia ad finem ducit",
  }),
  amicitia: orgDef({
    name: "Amicitia",
    colors: makeFlag("lilla", "roheline", "kuldne"),
    establishedYear: 1924,
    slogan: "Per aspera ad astra",
  }),
  sororitasEstoniae: orgDef({
    name: "Sororitas Estoniae",
    colors: makeFlag("valge", "roosa", "must"),
    establishedYear: 2011,
    slogan: "Teadmised on ilu",
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
