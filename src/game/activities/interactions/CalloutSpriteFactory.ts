import { CALLOUT_OFFSET, SpriteLibrary } from "../../sprites/SpriteLibrary";
import { Sprite } from "../../sprites/Sprite";
import { Drink } from "../../items/Drink";
import { coordAdd } from "../../Coord";

export enum InteractionType {
  glass = 0,
  beer = 1,
  water = 2,
  question = 3,
  opener = 4,
  ocean = 5,
  bottle = 6,
  emptyBottle = 7,
}

export class CalloutSpriteFactory {
  public static getSprite(type: InteractionType): Sprite {
    return SpriteLibrary.getSprite("callout", [type, 0]);
  }

  public static getBottleSprite(drink: Drink): Sprite {
    return {
      ...SpriteLibrary.getSprite("bottle", [2, drink.bottleSpriteIndex]),
      offset: coordAdd(CALLOUT_OFFSET, [0, 1]),
    };
  }
}
