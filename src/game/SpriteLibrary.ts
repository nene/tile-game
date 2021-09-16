import { ImageLibrary } from "./ImageLibrary";
import { SpriteSheet } from "./SpriteSheet";

export class SpriteLibrary {
  private sprites: Record<string, SpriteSheet> = {};

  constructor(images: ImageLibrary) {
    this.sprites = {
      'grass-bg': new SpriteSheet(images.get('grass-bg'), [32, 32], [1, 1]),
      'stones': new SpriteSheet(images.get('stones'), [16, 16], [4, 4]),
      'water': new SpriteSheet(images.get('water'), [16, 16], [4, 4]),

      'cabbage': new SpriteSheet(images.get('cabbage'), [32, 32], [1, 1]),
      'wheat': new SpriteSheet(images.get('wheat'), [32, 32], [1, 1]),
      'pepper': new SpriteSheet(images.get('pepper'), [32, 32], [1, 1]),
      'marygold': new SpriteSheet(images.get('marygold'), [32, 32], [1, 1]),
      'reed': new SpriteSheet(images.get('reed'), [32, 32], [1, 1]),
      'water-lily': new SpriteSheet(images.get('water-lily'), [32, 32], [1, 1]),

      'walk-right': new SpriteSheet(images.get("walk-right"), [32, 32], [1, 8]),
      'walk-left': new SpriteSheet(images.get("walk-left"), [32, 32], [1, 8]),
      'walk-forward': new SpriteSheet(images.get("walk-forward"), [32, 32], [1, 8]),
      'walk-back': new SpriteSheet(images.get("walk-back"), [32, 32], [1, 8]),
      'stand-right': new SpriteSheet(images.get("walk-right"), [32, 32], [1, 1]),
      'stand-left': new SpriteSheet(images.get("walk-left"), [32, 32], [1, 1]),
      'stand-forward': new SpriteSheet(images.get("walk-forward"), [32, 32], [1, 1]),
      'stand-back': new SpriteSheet(images.get("walk-back"), [32, 32], [1, 1]),
      'dig-right': new SpriteSheet(images.get("dig-right"), [32, 32], [1, 5]),

      'snail': new SpriteSheet(images.get("snail"), [32, 32], [1, 5]),
      'snail-kill': new SpriteSheet(images.get("snail-kill"), [112, 40], [1, 11]),
    };
  }

  get(name: string): SpriteSheet {
    return this.sprites[name];
  }
}
