import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { LocationBackground } from "./LocationBackground";

export type LocationName = "cfe-cellar" | "cfe-hall" | "outdoors";

export interface LocationFactory {
  getName: () => LocationName;
  getSize: () => Coord;
  getBackgrounds: () => LocationBackground[];
  getForeground: () => LocationBackground | undefined;
  getObjects: () => GameObject[];
}
