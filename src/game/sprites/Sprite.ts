import { Coord } from "../Coord";

export interface Sprite {
  image: CanvasImageSource,
  coord: Coord,
  size: Coord,
  offset: Coord,
}
