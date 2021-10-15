import { PixelScreen } from "../PixelScreen";

export interface LocationBackground {
  paint: (screen: PixelScreen) => void;
}
