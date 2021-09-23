import { Coord, coordAdd, coordConstrain, coordDiv, coordSub, Rect, rectOverlaps } from "./Coord";
import { GameWorld } from "./GameWorld";
import { Sprite } from "./Sprite";

interface PixelScreenOptions {
  width: number;
  height: number;
  scale: number;
  offset?: Coord;
}

interface DrawSpriteOptions {
  showCenter?: boolean;
  fixed?: boolean;
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
    this.offset = offset ?? [0, 0];
    this.ctx.scale(scale, scale);
    this.ctx.imageSmoothingEnabled = false;
  }

  drawSprite(sprite: Sprite, coord: Coord, opts?: DrawSpriteOptions) {
    const screenOffset: Coord = opts?.fixed ? [0, 0] : this.offset;

    if (rectOverlaps({ coord: coordAdd(coord, sprite.offset), size: sprite.size }, { coord: screenOffset, size: this.virtualSize })) {
      const adjustedCoord = coordSub(coordAdd(coord, sprite.offset), screenOffset);
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
      if (opts?.showCenter) {
        this.ctx.fillStyle = "red";
        const center = coordSub(coord, screenOffset);
        this.ctx.fillRect(center[0] - 2, center[1], 5, 1);
        this.ctx.fillRect(center[0], center[1] - 2, 1, 5);
      }
    }
  }

  drawRect(rect: Rect, color: string, opts?: DrawSpriteOptions) {
    const screenOffset: Coord = opts?.fixed ? [0, 0] : this.offset;

    const adjustedCoord = coordSub(rect.coord, screenOffset);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      adjustedCoord[0],
      adjustedCoord[1],
      rect.size[0],
      rect.size[1],
    );
  }

  drawText(text: string, coord: Coord) {
    this.ctx.font = "7px OldSchoolAdventures";
    this.ctx.fillText(text, coord[0], coord[1]);
  }

  saveBg() {
    this.bg = this.ctx.getImageData(0, 0, this.virtualSize[0] * this.scale, this.virtualSize[1] * this.scale);
  }

  centerTo(coord: Coord, world: GameWorld) {
    const halfScreenSize: Coord = coordDiv(this.virtualSize, [2, 2]);
    const minOffset: Coord = [0, 0];
    const maxOffset: Coord = coordSub(world.size(), this.virtualSize);

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
