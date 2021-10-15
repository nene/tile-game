import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { LocationBackground } from "./LocationBackground";

export interface LocationFactory {
  getSize: () => Coord;
  getBackground: () => LocationBackground;
  getObjects: () => GameObject[];
}
