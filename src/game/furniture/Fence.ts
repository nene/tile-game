import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export enum FenceType {
  cfe = 0,
  sakala = 1,
}

const boundsMap: Record<FenceType, Rect> = {
  [FenceType.cfe]: { coord: [3, 0], size: [73, 7] },
  [FenceType.sakala]: { coord: [2, 0], size: [76, 7] },
};

export class Fence implements GameObject {
  private sprite: Sprite;
  private bounds: Rect;

  constructor(private coord: Coord, fenceType: FenceType = FenceType.cfe) {
    this.sprite = SpriteLibrary.getSprite("fence", [fenceType, 0]);
    this.bounds = boundsMap[fenceType];
  }

  tick() {
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
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
    return this.bounds;
  }

  boundingBox(): Rect {
    return this.bounds;
  }

  isInteractable() {
    return false;
  }

  interact() { }
}
