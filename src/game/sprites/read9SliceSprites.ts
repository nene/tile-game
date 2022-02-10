import { Sprite } from "./Sprite";
import { AsepriteFile } from "./Aseprite";
import { Alignment, coordAdd, coordSub } from "../Coord";
import { rectFromAsepriteRect } from "./rectFromAsepriteRect";

export function read9SliceSprites(image: CanvasImageSource, { meta }: AsepriteFile): Record<Alignment, Sprite> {
  if (!meta.slices || meta.slices.length === 0) {
    throw new Error(`No slices found in Aseprite JSON.`);
  }
  const { bounds: aBounds, center: aCenter } = meta.slices[0].keys[0];
  if (!aCenter) {
    throw new Error(`No 9-slice def found in Aseprite JSON.`);
  }
  const bounds = rectFromAsepriteRect(aBounds);
  const center = rectFromAsepriteRect(aCenter);

  return {
    "center": {
      image,
      coord: coordAdd(bounds.coord, center.coord),
      size: center.size,
      offset: [0, 0],
    },
    "top": {
      image,
      coord: [bounds.coord[0] + center.coord[0], bounds.coord[1]],
      size: [center.size[0], center.coord[1]],
      offset: [0, 0],
    },
    "bottom": {
      image,
      coord: [bounds.coord[0] + center.coord[0], bounds.coord[1] + center.coord[1] + center.size[1]],
      size: [center.size[0], bounds.size[1] - center.coord[1] - center.size[1]],
      offset: [0, 0],
    },
    "left": {
      image,
      coord: [bounds.coord[0], bounds.coord[1] + center.coord[1]],
      size: [center.coord[0], center.size[1]],
      offset: [0, 0],
    },
    "right": {
      image,
      coord: [bounds.coord[0] + center.coord[0] + center.size[0], bounds.coord[1] + center.coord[1]],
      size: [bounds.size[0] - center.coord[0] - center.size[0], center.size[1]],
      offset: [0, 0],
    },
    "top-left": {
      image,
      coord: bounds.coord,
      size: center.coord,
      offset: [0, 0],
    },
    "top-right": {
      image,
      coord: [bounds.coord[0] + center.coord[0] + center.size[0], bounds.coord[1]],
      size: [bounds.size[0] - (center.coord[0] + center.size[0]), center.coord[1]],
      offset: [0, 0],
    },
    "bottom-left": {
      image,
      coord: [bounds.coord[0], bounds.coord[1] + center.coord[1] + center.size[1]],
      size: [center.coord[0], bounds.size[1] - (center.coord[1] + center.size[1])],
      offset: [0, 0],
    },
    "bottom-right": {
      image,
      coord: coordAdd(coordAdd(bounds.coord, center.coord), center.size),
      size: coordSub(bounds.size, coordAdd(center.coord, center.size)),
      offset: [0, 0],
    },
  };
}

