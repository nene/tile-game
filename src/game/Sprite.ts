import { Coord } from "./Coord";

export interface Sprite {
  image: HTMLImageElement,
  coord: Coord,
  size: Coord,
}