import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { CharacterGraphics } from "./Character";

export class FeenoksLadyGraphics implements CharacterGraphics {
  getSpriteName(): SpriteName {
    return "feenoks-lady";
  }

  getDefaultSprite(): Sprite {
    return SpriteLibrary.getSprite(this.getSpriteName(), [0, 0]);
  }

  getFaceSprite(): Sprite {
    return {
      ...this.getDefaultSprite(),
      coord: [0, 3],
      size: [16, 16],
      offset: [0, 0],
    };
  }
}
