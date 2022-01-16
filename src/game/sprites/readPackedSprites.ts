import { zipWith } from "lodash";
import { Coord, Rect } from "../Coord";
import { AsepriteFile, AsepriteFrame, AsepriteRect } from "./Aseprite";

export interface SpriteDef {
  name: string;
  source: Rect;
  offset: Coord;
  boundingBox: Rect;
}

export function readPackedSprites({ meta, frames }: AsepriteFile): SpriteDef[] {
  const bboxes = meta.slices?.map((slice) => slice.keys[0].bounds) || [];
  if (bboxes.length !== frames.length) {
    throw new Error(`Expected slice and frame counts to match. Instead got ${bboxes.length} slices and ${frames.length} frames.`);
  }

  return zipWith(frames, bboxes, readSpriteDef);
}

function readSpriteDef(frame: AsepriteFrame, bbox: AsepriteRect): SpriteDef {
  const source: Rect = {
    coord: [frame.frame.x, frame.frame.y],
    size: [frame.frame.w, frame.frame.h],
  };

  return {
    name: frame.filename,
    source: source,
    offset: [-bbox.x, -bbox.y],
    boundingBox: { coord: [0, 0], size: [bbox.w, bbox.h] },
  };
}
