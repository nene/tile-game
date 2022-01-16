import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";

export interface FurnitureClassConfig {
  sprite: Sprite | SpriteName;
  boundingBox: Rect;
  hitBox?: Rect;
}

export function createFurnitureClass(cfg: FurnitureClassConfig) {
  return class Furniture implements GameObject {
    constructor(private coord: Coord, private variant = 0) {
    }

    tick() { }

    paint(screen: PixelScreen) {
      const sprite = typeof cfg.sprite === "string" ? SpriteLibrary.getSprite(cfg.sprite, [this.variant, 0]) : cfg.sprite;
      screen.drawSprite(sprite, this.coord);
    }

    zIndex() {
      return this.coord[1];
    }

    getCoord() {
      return this.coord;
    }

    isSolid() {
      return true;
    }

    hitBox(): Rect {
      return cfg.hitBox ?? { coord: [0, 0], size: [0, 0] };
    }

    boundingBox(): Rect {
      return cfg.boundingBox;
    }

    isInteractable() {
      return false;
    }

    interact() { }
  }
}
