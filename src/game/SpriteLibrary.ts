import { Coord } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
import { SpriteSheet } from "./SpriteSheet";

const PLAYER_SIZE: Coord = [16, 32];
const PLAYER_OFFSET: Coord = [-8, -30];

export class SpriteLibrary {
  private sprites: Record<string, SpriteSheet> = {};

  constructor(images: ImageLibrary) {
    this.sprites = {
      'cfe-bg': new SpriteSheet(images.get('cfe-bg'), { size: [16, 16], colsRows: [1, 1] }),

      'cfe-reb': new SpriteSheet(images.get("cfe-reb"), { size: PLAYER_SIZE, colsRows: [4, 4], offset: PLAYER_OFFSET }),

      'cfe-ksv': new SpriteSheet(images.get("cfe-ksv"), { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET }),

      'table': new SpriteSheet(images.get("table"), { size: [64, 22], colsRows: [1, 1], offset: [0, -6] }),
    };
  }

  get(name: string): SpriteSheet {
    return this.sprites[name];
  }
}
