import { coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { fieldExists, readCoordField, readIntField, readMappedField, readStringField } from "../locations/entityFields";
import { EntityField } from "../locations/Level";
import { LocationName } from "../locations/LocationFactory";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { BeerBox } from "./BeerBox";
import { BeerCabinet } from "./BeerCabinet";
import { BookCabinet } from "./BookCabinet";
import { Countertop } from "./Countertop";
import { createAnimatedFurnitureClass } from "./createAnimatedFurnitureClass";
import { createFurnitureClass } from "./createFurnitureClass";
import { Door } from "./Door";
import { Fence, FenceType } from "./Fence";
import { Fridge } from "./Fridge";
import { KitchenSink } from "./KitchenSink";
import { Painting } from "./Painting";
import { Table } from "./Table";
import { Wall } from "./Wall";
import fireplaceJson from "../sprites/data/fireplace.json";
import feenoksPaymentCounterJson from "../sprites/data/feenoks-payment-counter.json";
import feenoksFridgeJson from "../sprites/data/feenoks-fridge.json";
import amicitiaFlagJson from "../sprites/data/amicitia-flag.json";
import furnitureJson from "../sprites/data/furniture.json";
import { PlayerSpawnPoint } from "../player/PlayerSpawnPoint";
import { createFurnitureMap } from "./createFurnitureMap";
import { ClassMap, VariantClassMap } from "./ClassMap";

let autoGenClassMap: ClassMap;

const classMap: ClassMap = {
  "BeerBox": BeerBox,
  "BeerCabinet": BeerCabinet,
  "BookCabinet": BookCabinet,
  "Countertop": Countertop,
  "PlayerSpawnPoint": PlayerSpawnPoint,
  "Fireplace": createAnimatedFurnitureClass({
    spriteName: "fireplace",
    asepriteFile: fireplaceJson,
    animationName: "fire",
    boundingBox: { coord: [1, 0], size: [62, 12] },
    hitBox: { coord: [0, -22], size: [48, 32] },
  }),
  "Fridge": Fridge,
  "KitchenSink": KitchenSink,
  "FeenoksShelfSideways": createFurnitureClass({
    sprite: "feenoks-shelf-sideways",
    boundingBox: { coord: [0, 0], size: [8, 32] },
  }),
  "FeenoksFridge": createAnimatedFurnitureClass({
    spriteName: "feenoks-fridge",
    asepriteFile: feenoksFridgeJson,
    animationName: "humming",
    boundingBox: { coord: [0, 0], size: [32, 11] },
  }),
  "FeenoksMop": createFurnitureClass({
    sprite: "feenoks-mop",
    boundingBox: { coord: [0, 0], size: [13, 5] },
  }),
  "FeenoksPaymentCounter": createAnimatedFurnitureClass({
    spriteName: "feenoks-payment-counter",
    asepriteFile: feenoksPaymentCounterJson,
    animationName: "idle",
    boundingBox: { coord: [0, 0], size: [32, 12] },
  }),
  "AmicitiaFlag": createAnimatedFurnitureClass({
    spriteName: "amicitia-flag",
    asepriteFile: amicitiaFlagJson,
    animationName: "wave",
    boundingBox: { coord: [0, 0], size: [0, 0] },
  }),
};

const variantClassMap: VariantClassMap = {
  "FeenoksShelf": createFurnitureClass({
    sprite: "feenoks-shelf",
    boundingBox: { coord: [0, 0], size: [32, 5] },
  }),
  "FeenoksCounter": createFurnitureClass({
    sprite: "feenoks-counter",
    boundingBox: { coord: [0, 0], size: [32, 12] },
  }),
  "FeenoksCounterSideways": createFurnitureClass({
    sprite: "feenoks-counter-sideways",
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
  if (!autoGenClassMap) {
    autoGenClassMap = createFurnitureMap(SpriteLibrary.getSprite("furniture").image, furnitureJson);
  }

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
  if (type === "Door") {
    return new Door({
      coord: coordAdd(coord, [0, size[1]]),
      area: { coord: [0, -size[1]], size },
      from: readStringField("from", fields) as LocationName,
      to: readStringField("to", fields) as LocationName,
      autoTeleportSide: readMappedField("autoTeleportSide", { Top: "top", Bottom: "bottom" }, fields),
      teleportOffset: fieldExists("teleportOffset", fields) ? readCoordField("teleportOffset", fields) : undefined,
    });
  }

  if (variantClassMap[type]) {
    return new variantClassMap[type](coord, readIntField("variant", fields));
  }
  if (classMap[type]) {
    return new classMap[type](coord);
  }
  if (autoGenClassMap[type]) {
    return new autoGenClassMap[type](coord);
  }

  throw new Error(`No class with name "${type}"`);
}
