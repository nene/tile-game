import { Coord, coordAdd, coordConstrain, coordDiv, coordSub } from "./Coord";
import { GameWorld } from "./GameWorld";
import { Sprite } from "./Sprite";

interface PixelScreenOptions {
  width: number;
  height: number;
  scale: number;
  offset: Coord;
}

export class PixelScreen {
  private ctx: CanvasRenderingContext2D;
  private virtualSize: Coord;
  private scale: number;
  private offset: Coord;
  private bg?: ImageData;

  constructor(ctx: CanvasRenderingContext2D, { width, height, scale, offset }: PixelScreenOptions) {
    this.ctx = ctx;
    this.virtualSize = [width, height];
    this.scale = scale;
    this.offset = offset;
    this.ctx.scale(scale, scale);
    this.ctx.imageSmoothingEnabled = false;
  }

  drawSprite(sprite: Sprite, coord: Coord) {
    const adjustedCoord = coordSub(coordAdd(coord, sprite.offset), this.offset);
    if (rectOverlaps([coordAdd(coord, sprite.offset), sprite.size], [this.offset, this.virtualSize])) {
      this.ctx.drawImage(
        sprite.image,
        sprite.coord[0],
        sprite.coord[1],
        sprite.size[0],
        sprite.size[1],
        adjustedCoord[0],
        adjustedCoord[1],
        sprite.size[0],
        sprite.size[1]
      );
    }
  }

  saveBg() {
    this.bg = this.ctx.getImageData(0, 0, this.virtualSize[0] * this.scale, this.virtualSize[1] * this.scale);
  }

  centerTo(coord: Coord, world: GameWorld) {
    const halfScreenSize: Coord = coordDiv(this.virtualSize, [2, 2]);
    const minOffset: Coord = [16, 16];
    const maxOffset: Coord = coordSub(world.size(), coordAdd(this.virtualSize, [16, 16]));

    this.offset = coordConstrain(coordSub(coord, halfScreenSize), minOffset, maxOffset);
  }

  restoreBg() {
    if (this.bg) {
      this.ctx.putImageData(this.bg, 0, 0);
    }
  }

  getOffset(): Coord {
    return this.offset;
  }
}

type Rect = [Coord, Coord];

function rectOverlaps([a1, aSize]: Rect, [b1, bSize]: Rect) {
  const a2 = coordAdd(a1, aSize);
  const b2 = coordAdd(b1, bSize);

  const xOverlaps = a1[0] <= b2[0] && a2[0] >= b1[0];
  const yOverlaps = a1[1] <= b2[1] && a2[1] >= b1[1];
  return xOverlaps && yOverlaps;
}
