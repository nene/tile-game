import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { GameItem } from "./GameItem";

// Dummy item to be used as a color-band-touch event
export class ColorBandTouch implements GameItem {
  getName() {
    return "Värvipaelale sõrm peale";
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("color-band");
  }

  combine() {
    return undefined;
  }
}

export const isColorBandTouch = (item: GameItem): item is ColorBandTouch => item instanceof ColorBandTouch;
