import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { CharacterGraphics } from "./Character";
import { Facing } from "../npc/Facing";
import { DrinkAnimationSprites } from "../sprites/DrinkAnimation";
import { FramesDef, SpriteAnimation } from "../sprites/SpriteAnimation";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { AcademicCharacterDef } from "./AcademicCharacter";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { mapValues } from "lodash";

interface DrinkAnimationSpriteConfig {
  sprites: DrinkAnimationSprites;
  idleTicks: number;
  drinkTicks: number;
}

export class AcademicCharacterGraphics implements CharacterGraphics {
  constructor(private def: AcademicCharacterDef) {
  }

  private getSpriteSheet(): SpriteSheet {
    return SpriteLibrary.get(this.def.spriteName);
  }

  getDefaultSprite(): Sprite {
    return this.getSpriteSheet().getSprite([0, 0]);
  }

  getFaceSprite(): Sprite {
    // Extract the upper portion (face) of the first sprite
    return {
      ...this.getDefaultSprite(),
      coord: [0, 3],
      size: [16, 16],
      offset: [0, 0],
    };
  }

  getMoveAnimations(): Record<Facing, SpriteAnimation> {
    return mapValues(
      this.def.moveAnimationFrames,
      (frames) => new SpriteAnimation(this.getSpriteSheet(), { frames })
    );
  }

  getDrinkAnimationConfig(): DrinkAnimationSpriteConfig {
    return {
      sprites: this.getDrinkSprites(),
      ...(this.def.drinkingSpeed ?? { idleTicks: 30, drinkTicks: 10 }),
    };
  }

  private getDrinkSprites(): DrinkAnimationSprites {
    const drinkFrames = readAsepriteAnimation("B", this.def.json);
    const [figure1, figure2, hand] = drinkFrames.length === 3 ? [0, 1, 2] : [0, 0, 1];
    return {
      figure1: this.getSpriteSheet().getSprite(drinkFrames[figure1].coord),
      figure2: this.getSpriteSheet().getSprite(drinkFrames[figure2].coord),
      hand: this.getSpriteSheet().getSprite(drinkFrames[hand].coord),
    }
  }

  getGreetAnimation(): SpriteAnimation {
    return new SpriteAnimation(this.getSpriteSheet(), {
      frames: this.getGreetAnimationFrames(),
      repeat: 1,
    });
  }

  private getGreetAnimationFrames(): FramesDef {
    try {
      return readAsepriteAnimation("greet", this.def.json);
    } catch (e) {
      return [[0, 0]];
    }
  }
}
