import { FlagColor, makeFlag } from "./FlagColors";

export enum OrgSkillLevel {
  estica = 0, // Only Fraternitas Estica
  fraternities1 = 1, // EÜS, Vironia, Sakala, Ugala, Rotalia
  sororities = 2, // ENÜS, FP, Indla, Lembela, Amicitia, Sor.Estoniae
  fraternities2 = 3, // Liviensis, Revelia, Tehnola, Leola, Tartuensis
  unions = 4, // Seltsid: Põhjala, Liivika, Veljesto, Raimla, Fennica + Arminia
  friends = 5, // Sõprusorgid: Lettonia, Polonia, NeoLithuania, Savo, Värmlands Nation
  level6 = 6,
  level7 = 7,
  level8 = 8,
  level9 = 9,
  level10 = 10,
}

export interface Organization {
  name: string;
  colors: FlagColor[];
  establishedYear: number;
  establishedPlace: string;
  slogan?: string;
  level: OrgSkillLevel;
}

const orgDef = (org: Organization) => org;

const orgs = {
  eus: orgDef({
    name: "EÜS",
    colors: makeFlag("sinine", "must", "valge"),
    establishedYear: 1870,
    establishedPlace: "Tartu",
    slogan: "Fortiter in re, sauviter in modo",
    level: OrgSkillLevel.fraternities1,
  }),
  vironia: orgDef({
    name: "Vironia",
    colors: makeFlag("violett", "must", "valge"),
    establishedYear: 1900,
    establishedPlace: "Riia",
    slogan: "Ühisus, kindlus, ausus",
    level: OrgSkillLevel.fraternities1,
  }),
  estica: orgDef({
    name: "Fraternitas Estica",
    colors: makeFlag("sinine", "roheline", "valge"),
    establishedYear: 1907,
    establishedPlace: "Tartu",
    slogan: "Teos õiglane ja vahvas, ustav sulle, Eesti rahvas",
    level: OrgSkillLevel.estica,
  }),
  sakala: orgDef({
    name: "Sakala",
    colors: makeFlag("sinine", "violett", "valge"),
    establishedYear: 1909,
    establishedPlace: "Tartu",
    slogan: "Üks kõige, kõik ühe eest",
    level: OrgSkillLevel.fraternities1,
  }),
  ugala: orgDef({
    name: "Ugala",
    colors: makeFlag("must", "sinine", "valge"),
    establishedYear: 1913,
    establishedPlace: "Tartu",
    slogan: "Isamaa, sõprus, ausus",
    level: OrgSkillLevel.fraternities1,
  }),
  rotalia: orgDef({
    name: "Rotalia",
    colors: makeFlag("sinine", "must", "roheline"),
    establishedYear: 1913,
    establishedPlace: "Peterburg",
    slogan: "Eestimaa, mu isamaa",
    level: OrgSkillLevel.fraternities1,
  }),
  liviensis: orgDef({
    name: "Fraternitas Liviensis",
    colors: makeFlag("violett", "roheline", "valge"),
    establishedYear: 1918,
    establishedPlace: "Tartu",
    slogan: "Vendlus, ausus, hoolsus",
    level: OrgSkillLevel.fraternities2,
  }),
  leola: orgDef({
    name: "Leola",
    colors: makeFlag("violett", "kollane", "valge"),
    establishedYear: 1920,
    establishedPlace: "Tallinn",
    slogan: "Age quod agis",
    level: OrgSkillLevel.fraternities2,
  }),
  revelia: orgDef({
    name: "Revelia",
    colors: makeFlag("roheline", "must", "valge"),
    establishedYear: 1920,
    establishedPlace: "Tartu",
    slogan: "Üks kõige, kõik ühe eest",
    level: OrgSkillLevel.fraternities2,
  }),
  tehnola: orgDef({
    name: "Tehnola",
    colors: makeFlag("must", "roheline", "valge"),
    establishedYear: 1921,
    establishedPlace: "Tallinn",
    slogan: "Kindlus, ausus, vendlus",
    level: OrgSkillLevel.fraternities2,
  }),
  tartuensis: orgDef({
    name: "Fraternitas Tartuensis",
    colors: makeFlag("roheline", "valge", "violett"),
    establishedYear: 1929,
    establishedPlace: "Tartu",
    slogan: "Pidevas töös tõe valguses elurõõmsalt tulevikku",
    level: OrgSkillLevel.fraternities2,
  }),
  arminia: orgDef({
    name: "Arminia Dorpatensis",
    colors: makeFlag("must", "valge", "kuldne"),
    establishedYear: 1994,
    establishedPlace: "Tartu",
    slogan: "Jumal, vabadus, isamaa",
    level: OrgSkillLevel.unions,
  }),
  filiaePatriae: orgDef({
    name: "Filiae Patriae",
    colors: makeFlag("valge", "punane", "roheline"),
    establishedYear: 1920,
    establishedPlace: "Tartu",
    slogan: "Eesti tütar, Eesti kodu, tugevasti seotud olgu",
    level: OrgSkillLevel.sororities,
  }),
  indla: orgDef({
    name: "Indla",
    colors: makeFlag("kirsipruun", "valge", "roheline"),
    establishedYear: 1924,
    establishedPlace: "Tartu",
    slogan: "Sõnasse kindlust, teosse ausust, kodule armastust",
    level: OrgSkillLevel.sororities,
  }),
  lembela: orgDef({
    name: "Lembela",
    colors: makeFlag("helebeez", "roheline", "violett"),
    establishedYear: 1924,
    establishedPlace: "Tartu",
    slogan: "Constantia ad finem ducit",
    level: OrgSkillLevel.sororities,
  }),
  amicitia: orgDef({
    name: "Amicitia",
    colors: makeFlag("lilla", "roheline", "kuldne"),
    establishedYear: 1924,
    establishedPlace: "Tartu",
    slogan: "Per aspera ad astra",
    level: OrgSkillLevel.sororities,
  }),
  sororitasEstoniae: orgDef({
    name: "Sororitas Estoniae",
    colors: makeFlag("valge", "roosa", "must"),
    establishedYear: 2011,
    establishedPlace: "Tallinn",
    slogan: "Teadmised on ilu",
    level: OrgSkillLevel.sororities,
  }),
  pohjala: orgDef({
    name: "EÜS Põhjala",
    colors: [],
    establishedYear: 1884,
    establishedPlace: "Peterburg",
    slogan: "Töö isamaa kasuks",
    level: OrgSkillLevel.unions,
  }),
  enys: orgDef({
    name: "Eesti Naisüliõpilaste Selts",
    colors: [],
    establishedYear: 1911,
    establishedPlace: "Tartu",
    slogan: "Demokraatia, rahvuslikkus, individuaalsus",
    level: OrgSkillLevel.sororities,
  }),
  liivika: orgDef({
    name: "ÜS Liivika",
    colors: [],
    establishedYear: 1909,
    establishedPlace: "Tartu",
    slogan: "Ex solo ad solem soli patriae",
    level: OrgSkillLevel.unions,
  }),
  veljesto: orgDef({
    name: "EYS Veljesto",
    colors: [],
    establishedYear: 1920,
    establishedPlace: "Tartu",
    slogan: "Õige vaimsuse kaudu vendlusele, nende mõlema kaudu vabadusele",
    level: OrgSkillLevel.unions,
  }),
  raimla: orgDef({
    name: "ÜS Raimla",
    colors: makeFlag("sinine", "valge"), // todo: helesinine
    establishedYear: 1922,
    establishedPlace: "Tartu",
    slogan: "Demokraatia, isiksus, isamaa",
    level: OrgSkillLevel.unions,
  }),
  fennica: orgDef({
    name: "ÜÜ Fraternitas Fennica",
    colors: makeFlag("kuldne", "must", "valge"),
    establishedYear: 1926,
    establishedPlace: "Tartu",
    slogan: undefined,
    level: OrgSkillLevel.unions,
  }),
  lettonia: orgDef({
    name: "Lettonia",
    colors: makeFlag("roheline", "sinine", "kuldne"),
    establishedYear: 1870,
    establishedPlace: "Tartu",
    slogan: undefined,
    level: OrgSkillLevel.friends,
  }),
  polonia: orgDef({
    name: "Polonia",
    colors: makeFlag("punane", "sinine", "valge"),
    establishedYear: 1828,
    establishedPlace: "Tartu",
    slogan: undefined,
    level: OrgSkillLevel.friends,
  }),
  savo: orgDef({
    name: "Savolainen Osakunta",
    colors: makeFlag("kollane", "must"),
    establishedYear: 1905,
    establishedPlace: "Helsingi",
    slogan: undefined,
    level: OrgSkillLevel.friends,
  }),
  neoLithuania: orgDef({
    name: "Neo-Lithuania",
    colors: makeFlag("roheline", "punane", "kuldne"),
    establishedYear: 1922,
    establishedPlace: "Kaunas",
    slogan: undefined,
    level: OrgSkillLevel.friends,
  }),
  varmlandsNation: orgDef({
    name: "Värmlands Nation",
    colors: makeFlag("kollane", "must", "kollane"),
    establishedYear: 1660,
    establishedPlace: "Uppsala",
    slogan: undefined,
    level: OrgSkillLevel.friends,
  }),
};

export type OrgName = keyof typeof orgs;

export function getOrg(name: OrgName): Organization {
  return orgs[name];
}

export function allOrganizations(): Organization[] {
  return Object.values(orgs);
}
