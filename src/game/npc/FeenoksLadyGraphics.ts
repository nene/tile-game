import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { Sprite } from "../sprites/Sprite";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { CharacterGraphics } from "./Character";
import feenoksLadyJson from "../sprites/data/feenoks-lady.json";

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

  getIdleAnimation(): SpriteAnimation {
    return new SpriteAnimation(SpriteLibrary.get(this.getSpriteName()), {
      frames: readAsepriteAnimation("idle", feenoksLadyJson),
    });
  }
}
