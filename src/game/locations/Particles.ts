import { PixelScreen } from "../PixelScreen";

export interface Particles {
  tick: () => void;
  paint: (screen: PixelScreen) => void;
}
