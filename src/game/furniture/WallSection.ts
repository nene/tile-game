import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

type WallType = "cfe-hall" | "cfe-cellar";

const spriteCoords: Record<WallType, Coord[]> = {
  "cfe-hall": [[7, 2], [7, 1], [7, 0]],
  "cfe-cellar": [[6, 2], [6, 1], [6, 0]],
};

// Sort of like Wall, but visible
export class WallSection implements GameObject {
  private coord: Coord;
  private size: Coord;
  private sprites: Sprite[];

  constructor({ coord, size }: Rect, private type: WallType) {
    this.coord = coord;
    this.size = size;
    this.sprites = spriteCoords[type].map((coord) => SpriteLibrary.getSprite("cfe-bg", coord));
  }

  tick() { }

  paint(screen: PixelScreen) {
    for (let x = 0; x < this.size[0]; x += 16) {
      this.sprites.forEach((sprite, y) => {
        screen.drawSprite(sprite, coordAdd(this.coord, [x, y * -16]));
      });
    }
  }

  getCoord() {
    return this.coord;
  }

  zIndex() {
    return this.coord[1];
  }

  isSolid() {
    return true;
  }

  hitBox(): Rect {
    return { coord: [0, 0], size: this.size };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: this.size };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}
