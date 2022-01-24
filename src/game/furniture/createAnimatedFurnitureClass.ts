import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { AsepriteFile } from "../sprites/Aseprite";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";

export interface AnimatedFurnitureClassConfig {
  spriteName: SpriteName;
  boundingBox: Rect;
  hitBox?: Rect;
  asepriteFile: AsepriteFile;
  animationName: string;
}

export function createAnimatedFurnitureClass(cfg: AnimatedFurnitureClassConfig) {
  return class AnimatedFurniture implements GameObject {
    private animation: SpriteAnimation;
    constructor(private coord: Coord) {
      this.animation = new SpriteAnimation(SpriteLibrary.get(cfg.spriteName), {
        frames: readAsepriteAnimation(cfg.animationName, cfg.asepriteFile),
      });
    }

    tick() {
      this.animation.tick();
    }

    paint(screen: PixelScreen) {
      screen.drawSprites(this.animation.getSprites(), this.coord);
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
