import { Sprite } from "./Sprite";

export interface Animation {
  getSprites: () => Sprite[];
  tick: () => void;
  isFinished: () => boolean;
}

