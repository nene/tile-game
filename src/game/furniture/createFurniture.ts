import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { EntityField } from "../locations/Level";
import { SpriteName } from "../sprites/SpriteLibrary";
import { BeerBox } from "./BeerBox";
import { BeerCabinet } from "./BeerCabinet";
import { BoardTable } from "./BoardTable";
import { BookCabinet } from "./BookCabinet";
import { Countertop } from "./Countertop";
import { Fireplace } from "./Fireplace";
import { Fridge } from "./Fridge";
import { KitchenSink } from "./KitchenSink";
import { Painting } from "./Painting";
import { Pianino } from "./Pianino";
import { Sofa } from "./Sofa";
import { Table } from "./Table";

const classMap: Record<string, { new(coord: Coord): GameObject }> = {
  "BeerBox": BeerBox,
  "BeerCabinet": BeerCabinet,
  "BoardTable": BoardTable,
  "BookCabinet": BookCabinet,
  "Countertop": Countertop,
  "Fireplace": Fireplace,
  "Fridge": Fridge,
  "KitchenSink": KitchenSink,
  "Pianino": Pianino,
  "Sofa": Sofa,
}

const paintingMap: Record<string, SpriteName> = {
  "Coat_of_arms": "coat-of-arms",
  "Polonia_cartel": "polonia-cartel",
  "Bulletin_board": "bulletin-board",
  "Color_shield": "color-shield",
};

export function createFurniture(type: string, coord: Coord, fields: EntityField[]): GameObject {
  if (type === "Painting") {
    return new Painting(coord, paintingMap[fields[0].__value]);
  }
  if (type === "Table") {
    return new Table(coord, fields[0].__value === "RTL" ? "RTL" : "LTR");
  }
  return new classMap[type](coord);
}