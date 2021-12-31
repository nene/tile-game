import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";

export interface FurnitureClassConfig {
  spriteName: SpriteName;
  boundingBox: Rect;
}

export function createFurnitureClass(cfg: FurnitureClassConfig) {
  return class Furniture implements GameObject {
    constructor(private coord: Coord) {
    }

    tick() { }

    paint(screen: PixelScreen) {
      screen.drawSprite(SpriteLibrary.getSprite(cfg.spriteName), this.coord);
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
      return { coord: [0, 0], size: [0, 0] };
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
