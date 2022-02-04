import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { CharacterGraphics } from "./Character";
import { Facing } from "../npc/Facing";
import { DrinkAnimationConfig, DrinkAnimationSprites } from "../sprites/DrinkAnimation";
import { FramesDef } from "../sprites/SpriteAnimation";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { AcademicCharacter, AcademicCharacterDef } from "./AcademicCharacter";

export class AcademicCharacterGraphics implements CharacterGraphics {
  constructor(private character: AcademicCharacter, private def: AcademicCharacterDef) {
  }

  getSpriteName() {
    return this.def.spriteName;
  }

  getFaceSprite(): Sprite {
    // Extract the upper portion (face) of the first sprite
    return {
      ...SpriteLibrary.getSprite(this.def.spriteName, [0, 0]),
      coord: [0, 3],
      size: [16, 16],
      offset: [0, 0],
    };
  }

  getMoveAnimationFrames(): Record<Facing, FramesDef> {
    return this.def.moveAnimationFrames ?? {
      up: [[0, 0]],
      down: [[0, 0]],
      left: [[0, 0]],
      right: [[0, 0]],
    };
  }

  getDrinkAnimationConfig(): DrinkAnimationConfig {
    const beerGlass = this.character.getField("glass");
    if (!beerGlass) {
      throw new Error("Can't execute drink animation when no beer glass at hand");
    }
    return {
      beerGlass,
      sprites: this.getDrinkSprites(),
      ...(this.def.drinkingSpeed ?? { idleTicks: 30, drinkTicks: 10 }),
    };
  }

  private getDrinkSprites(): DrinkAnimationSprites {
    const drinkFrames = readAsepriteAnimation("B", this.def.json);
    const [figure1, figure2, hand] = drinkFrames.length === 3 ? [0, 1, 2] : [0, 0, 1];
    return {
      figure1: SpriteLibrary.getSprite(this.def.spriteName, drinkFrames[figure1].coord),
      figure2: SpriteLibrary.getSprite(this.def.spriteName, drinkFrames[figure2].coord),
      hand: SpriteLibrary.getSprite(this.def.spriteName, drinkFrames[hand].coord),
    }
  }

  getGreetAnimationFrames(): FramesDef {
    try {
      return readAsepriteAnimation("greet", this.def.json);
    } catch (e) {
      return [[0, 0]];
    }
  }
}
