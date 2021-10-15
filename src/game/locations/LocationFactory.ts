import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { LocationBackground } from "./LocationBackground";

export type LocationName = "cfe" | "outdoors";

export interface LocationFactory {
  getName: () => LocationName;
  getSize: () => Coord;
  getBackground: () => LocationBackground;
  getObjects: () => GameObject[];
}
