import { SpriteLibrary } from "../../sprites/SpriteLibrary";
import { Sprite } from "../../sprites/Sprite";

export enum InteractionType {
  glass = 0,
  beer = 1,
  water = 2,
  question = 3,
  opener = 4,
  bottle = 5,
  emptyBottle = 6,
}

export class CalloutSpriteFactory {
  public static getSprite(type: InteractionType): Sprite {
    return SpriteLibrary.getSprite("callout", [type, 0]);
  }
}
