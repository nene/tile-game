import { Coord, coordAdd, coordSubtract } from "./Coord";
import { Sprite } from "./Sprite";

interface PixelScreenOptions {
  width: number;
  height: number;
  scale: number;
  offset: Coord;
}

export class PixelScreen {
  private ctx: CanvasRenderingContext2D;
  private virtualWidth: number;
  private virtualHeight: number;
  private scale: number;
  private offset: Coord;
  private bg?: ImageData;

  constructor(ctx: CanvasRenderingContext2D, { width, height, scale, offset }: PixelScreenOptions) {
    this.ctx = ctx;
    this.virtualWidth = width;
    this.virtualHeight = height;
    this.scale = scale;
    this.offset = offset;
    this.ctx.scale(scale, scale);
    this.ctx.imageSmoothingEnabled = false;
  }

  drawSprite(sprite: Sprite, coord: Coord) {
    const adjustedCoord = coordSubtract(coordAdd(coord, sprite.offset), this.offset);
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

  saveBg() {
    this.bg = this.ctx.getImageData(0, 0, this.virtualWidth * this.scale, this.virtualHeight * this.scale);
  }

  restoreBg() {
    if (this.bg) {
      this.ctx.putImageData(this.bg, 0, 0);
    }
  }

  width(): number {
    return this.virtualWidth;
  }

  height(): number {
    return this.virtualHeight;
  }
}
