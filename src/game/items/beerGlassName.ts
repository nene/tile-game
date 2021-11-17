import { AlcoSkill } from "../attributes/AlcoSkill";
import { BeerGlass } from "./BeerGlass";
import { getDrink } from "./Drink";

export function beerGlassName(glass: BeerGlass, alcoSkill: AlcoSkill) {
  const drink = glass.getDrink();
  if (!drink) {
    return "Tühi šoppen";
  }

  if (drink === getDrink("water") || drink === getDrink("limonaad") || alcoSkill.knowsDrink(drink)) {
    return `Šoppen ${drink.withName}`;
  } else {
    return "Šoppen õllega";
  }
}
