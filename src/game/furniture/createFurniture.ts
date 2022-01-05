import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { readIntField, readMappedField } from "../locations/entityFields";
import { EntityField } from "../locations/Level";
import { SpriteName } from "../sprites/SpriteLibrary";
import { BeerBox } from "./BeerBox";
import { BeerCabinet } from "./BeerCabinet";
import { BookCabinet } from "./BookCabinet";
import { Countertop } from "./Countertop";
import { createFurnitureClass } from "./createFurnitureClass";
import { Fence, FenceType } from "./Fence";
import { Fireplace } from "./Fireplace";
import { Fridge } from "./Fridge";
import { KitchenSink } from "./KitchenSink";
import { Painting } from "./Painting";
import { Table } from "./Table";
import { Wall } from "./Wall";

const classMap: Record<string, { new(coord: Coord): GameObject }> = {
  "BeerBox": BeerBox,
  "BeerCabinet": BeerCabinet,
  "BookCabinet": BookCabinet,
  "Countertop": Countertop,
  "Fireplace": Fireplace,
  "Fridge": Fridge,
  "KitchenSink": KitchenSink,
  "BoardTable": createFurnitureClass({
    spriteName: "board-table",
    boundingBox: { coord: [-5, 4], size: [42, 13] },
    hitBox: { coord: [-5, -5], size: [42, 22] },
  }),
  "Pianino": createFurnitureClass({
    spriteName: "pianino",
    boundingBox: { coord: [0, 0], size: [32, 9] },
    hitBox: { coord: [0, -17], size: [32, 26] },
  }),
  "Sofa": createFurnitureClass({
    spriteName: "sofa",
    boundingBox: { coord: [0, 0], size: [48, 11] },
    hitBox: { coord: [0, -15], size: [48, 26] },
  }),
  "FeenoksShelfSideways": createFurnitureClass({
    spriteName: "feenoks-shelf-sideways",
    boundingBox: { coord: [0, 0], size: [8, 32] },
  }),
  "FeenoksFridge": createFurnitureClass({
    spriteName: "feenoks-fridge",
    boundingBox: { coord: [0, 0], size: [32, 11] },
  }),
};

const variantClassMap: Record<string, { new(coord: Coord, variant?: number): GameObject }> = {
  "FeenoksShelf": createFurnitureClass({
    spriteName: "feenoks-shelf",
    boundingBox: { coord: [0, 0], size: [32, 5] },
  }),
  "FeenoksCounter": createFurnitureClass({
    spriteName: "feenoks-counter",
    boundingBox: { coord: [0, 0], size: [32, 12] },
  }),
  "FeenoksCounterSideways": createFurnitureClass({
    spriteName: "feenoks-counter-sideways",
    boundingBox: { coord: [0, 0], size: [16, 29] },
  }),
};

const paintingMap: Record<string, SpriteName> = {
  "CFE_coat_of_arms": "cfe-coat-of-arms",
  "Sakala_coat_of_arms": "sakala-coat-of-arms",
  "Polonia_cartel": "polonia-cartel",
  "Bulletin_board": "bulletin-board",
  "Color_shield": "color-shield",
};

export function createFurniture(type: string, { coord, size }: Rect, fields: EntityField[]): GameObject {
  if (type === "Painting") {
    return new Painting(coord, readMappedField("Painting", paintingMap, fields));
  }
  if (type === "Table") {
    return new Table(coord, readMappedField("sittingDir", { "RTL": "RTL", "LTR": "LTR" }, fields));
  }
  if (type === "Fence") {
    return new Fence(coord, readMappedField("FenceType", { "Cfe": FenceType.cfe, "Sakala": FenceType.sakala }, fields));
  }
  if (type === "Wall") {
    return new Wall({ coord, size });
  }

  if (variantClassMap[type]) {
    return new variantClassMap[type](coord, readIntField("variant", fields));
  }
  if (classMap[type]) {
    return new classMap[type](coord);
  }

  throw new Error(`No class with name "${type}"`);
}
