import { AsepriteFile } from "../sprites/Aseprite";
import { readPackedSprites } from "../sprites/readPackedSprites";
import { ClassMap } from "./ClassMap";
import { createFurnitureClass } from "./createFurnitureClass";

export function createFurnitureMap(image: HTMLImageElement, json: AsepriteFile): ClassMap {
  const gameObjectDefs = readPackedSprites(json);

  const classMap: ClassMap = {};

  gameObjectDefs.forEach((def) => {
    classMap[def.name] = createFurnitureClass({
      sprite: {
        image,
        coord: def.source.coord,
        size: def.source.size,
        offset: def.offset,
      },
      boundingBox: def.boundingBox,
    });
  });

  return classMap;
}
