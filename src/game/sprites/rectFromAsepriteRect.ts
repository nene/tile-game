import { Rect } from "../Coord";
import { AsepriteRect } from "./Aseprite";

export function rectFromAsepriteRect({ x, y, w, h }: AsepriteRect): Rect {
  return { coord: [x, y], size: [w, h] };
}
