import { Coord } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
import { SpriteSheet } from "./SpriteSheet";

const PLANT_OFFSET: Coord = [-8, -16];

const PLAYER_SIZE: Coord = [32, 40];
const PLAYER_OFFSET: Coord = [-16, -37];

export class SpriteLibrary {
  private sprites: Record<string, SpriteSheet> = {};

  constructor(images: ImageLibrary) {
    this.sprites = {
      'grass-bg': new SpriteSheet(images.get('grass-bg'), { size: [32, 32], colsRows: [1, 1] }),
      'stones': new SpriteSheet(images.get('stones'), { size: [16, 16], colsRows: [4, 4] }),
      'water': new SpriteSheet(images.get('water'), { size: [16, 16], colsRows: [4, 4] }),

      'cabbage': new SpriteSheet(images.get('cabbage'), { size: [32, 32], colsRows: [1, 1], offset: PLANT_OFFSET }),
      'wheat': new SpriteSheet(images.get('wheat'), { size: [32, 32], colsRows: [1, 1], offset: PLANT_OFFSET }),
      'pepper': new SpriteSheet(images.get('pepper'), { size: [32, 32], colsRows: [1, 1], offset: PLANT_OFFSET }),
      'marygold': new SpriteSheet(images.get('marygold'), { size: [32, 32], colsRows: [1, 1], offset: PLANT_OFFSET }),
      'reed': new SpriteSheet(images.get('reed'), { size: [32, 32], colsRows: [1, 1], offset: PLANT_OFFSET }),
      'water-lily': new SpriteSheet(images.get('water-lily'), { size: [32, 32], colsRows: [1, 1], offset: PLANT_OFFSET }),

      'player': new SpriteSheet(images.get("player"), { size: PLAYER_SIZE, colsRows: [4, 4], offset: PLAYER_OFFSET }),
      'dig-right': new SpriteSheet(images.get("dig-right"), { size: [32, 32], colsRows: [1, 5], offset: [-16, -31] }),

      'snail': new SpriteSheet(images.get("snail"), { size: [32, 32], colsRows: [1, 5], offset: [-16, -28] }),
      'snail-kill': new SpriteSheet(images.get("snail-kill"), { size: [112, 40], colsRows: [1, 11], offset: [-56, -36] }),
    };
  }

  get(name: string): SpriteSheet {
    return this.sprites[name];
  }
}
