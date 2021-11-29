import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { EntityField } from "../locations/Level";
import { SpriteName } from "../sprites/SpriteLibrary";
import { BoardTable } from "./BoardTable";
import { Painting } from "./Painting";
import { Pianino } from "./Pianino";

const classMap: Record<string, { new(coord: Coord): GameObject }> = {
  "Pianino": Pianino,
  "BoardTable": BoardTable,
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
  return new classMap[type](coord);
}
