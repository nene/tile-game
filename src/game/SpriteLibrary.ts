import { ImageLibrary } from "./ImageLibrary";
import { SpriteSheet } from "./SpriteSheet";

export class SpriteLibrary {
  private sprites: Record<string, SpriteSheet> = {};

  constructor(images: ImageLibrary) {
    this.sprites = {
      'grass-bg': new SpriteSheet(images.get('grass-bg'), { size: [32, 32], colsRows: [1, 1] }),
      'stones': new SpriteSheet(images.get('stones'), { size: [16, 16], colsRows: [4, 4] }),
      'water': new SpriteSheet(images.get('water'), { size: [16, 16], colsRows: [4, 4] }),

      'cabbage': new SpriteSheet(images.get('cabbage'), { size: [32, 32], colsRows: [1, 1] }),
      'wheat': new SpriteSheet(images.get('wheat'), { size: [32, 32], colsRows: [1, 1] }),
      'pepper': new SpriteSheet(images.get('pepper'), { size: [32, 32], colsRows: [1, 1] }),
      'marygold': new SpriteSheet(images.get('marygold'), { size: [32, 32], colsRows: [1, 1] }),
      'reed': new SpriteSheet(images.get('reed'), { size: [32, 32], colsRows: [1, 1] }),
      'water-lily': new SpriteSheet(images.get('water-lily'), { size: [32, 32], colsRows: [1, 1] }),

      'walk-right': new SpriteSheet(images.get("walk-right"), { size: [32, 32], colsRows: [1, 8] }),
      'walk-left': new SpriteSheet(images.get("walk-left"), { size: [32, 32], colsRows: [1, 8] }),
      'walk-forward': new SpriteSheet(images.get("walk-forward"), { size: [32, 32], colsRows: [1, 8] }),
      'walk-back': new SpriteSheet(images.get("walk-back"), { size: [32, 32], colsRows: [1, 8] }),
      'stand-right': new SpriteSheet(images.get("walk-right"), { size: [32, 32], colsRows: [1, 1] }),
      'stand-left': new SpriteSheet(images.get("walk-left"), { size: [32, 32], colsRows: [1, 1] }),
      'stand-forward': new SpriteSheet(images.get("walk-forward"), { size: [32, 32], colsRows: [1, 1] }),
      'stand-back': new SpriteSheet(images.get("walk-back"), { size: [32, 32], colsRows: [1, 1] }),
      'dig-right': new SpriteSheet(images.get("dig-right"), { size: [32, 32], colsRows: [1, 5] }),

      'snail': new SpriteSheet(images.get("snail"), { size: [32, 32], colsRows: [1, 5] }),
      'snail-kill': new SpriteSheet(images.get("snail-kill"), { size: [112, 40], colsRows: [1, 11] }),
    };
  }

  get(name: string): SpriteSheet {
    return this.sprites[name];
  }
}
