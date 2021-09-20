import { Coord } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
import { SpriteSheet } from "./SpriteSheet";

const PLAYER_SIZE: Coord = [32, 40];
const PLAYER_OFFSET: Coord = [-16, -37];

export class SpriteLibrary {
  private sprites: Record<string, SpriteSheet> = {};

  constructor(images: ImageLibrary) {
    this.sprites = {
      'cfe-bg': new SpriteSheet(images.get('cfe-bg'), { size: [16, 16], colsRows: [1, 3] }),

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
