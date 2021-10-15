import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { LocationBackground } from "./LocationBackground";

export interface LocationFactory {
  getName: () => string;
  getSize: () => Coord;
  getBackground: () => LocationBackground;
  getObjects: () => GameObject[];
}
