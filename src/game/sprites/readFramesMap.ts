import { Coord } from "../Coord";
import { AsepriteFile } from "./Aseprite";

export function readFramesMap({ frames }: AsepriteFile): Record<string, Coord> {
  const map: Record<string, Coord> = {};
  frames.forEach((frame, i) => {
    map[frame.filename] = [i, 0];
  });
  return map;
}
