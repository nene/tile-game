import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { LocationBackground } from "./LocationBackground";
import { Particles } from "./Particles";

export type LocationName = "cfe-cellar" | "cfe-hall" | "outdoors" | "sakala-hall" | "feenoks";

export interface LocationFactory {
  getName: () => LocationName;
  getSize: () => Coord;
  getBackgrounds: () => LocationBackground[];
  getForeground: () => LocationBackground | undefined;
  getParticles?: () => Particles;
  getObjects: () => GameObject[];
}
