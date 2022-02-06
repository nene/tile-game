import { InteractionType } from "./Interaction";
import { SpriteLibrary } from "../../sprites/SpriteLibrary";
import { Sprite } from "../../sprites/Sprite";

export class CalloutSpriteFactory {
  public static getSprite(type: InteractionType): Sprite {
    return SpriteLibrary.getSprite("callout", [type, 0]);
  }
}
