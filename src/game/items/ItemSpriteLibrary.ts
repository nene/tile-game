import itemsJson from "../sprites/data/items.json";
import { readFramesMap } from "../sprites/readFramesMap";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

const framesMap = readFramesMap(itemsJson);

export type ItemSpriteType = 'bottle-opener-simple' | 'bottle-opener-locked' | 'tap' | 'drain' | 'book' | 'ocean';

export class ItemSpriteLibrary {
  public static getSprite(name: ItemSpriteType) {
    return SpriteLibrary.getSprite("items", framesMap[name]);
  }
}
