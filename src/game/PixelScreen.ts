import { Coord, coordAdd, coordConstrain, coordDiv, coordSub, Rect, rectOverlaps } from "./Coord";
import { GameWorld } from "./GameWorld";
import { Sprite } from "./Sprite";

export interface PixelScreenOptions {
  width: number;
  height: number;
  scale: number;
  offset?: Coord;
}

interface DrawSpriteOptions {
  showCenter?: boolean;
  fixed?: boolean;
}

export interface TextStyle {
  color?: string;
  size?: "small" | "medium";
  align?: "center" | "end" | "left" | "right" | "start";
  shadowColor?: string;
}

export class PixelScreen {
  private ctx: CanvasRenderingContext2D;
  private virtualSize: Coord;
  private scale: number;
  private offset: Coord;
  private bg?: ImageData;
  private fixed = false;

  constructor(ctx: CanvasRenderingContext2D, { width, height, scale, offset }: PixelScreenOptions) {
    this.ctx = ctx;
    this.virtualSize = [width, height];
    this.scale = scale;
    this.offset = offset ?? [0, 0];
    this.ctx.scale(scale, scale);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.textBaseline = "top";
  }

  withFixedCoords(fn: () => void) {
    this.fixed = true;
    fn();
    this.fixed = false;
  }

  drawSprite(sprite: Sprite, coord: Coord, opts?: DrawSpriteOptions) {
    const screenOffset: Coord = this.isFixed(opts) ? [0, 0] : this.offset;

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

  drawRect(rect: Rect, fill: string | Sprite, opts?: DrawSpriteOptions) {
    const screenOffset: Coord = this.isFixed(opts) ? [0, 0] : this.offset;

    const adjustedCoord = coordSub(rect.coord, screenOffset);
    if (typeof fill === "string") {
      this.fillSolidColorRect(adjustedCoord, rect.size, fill);
    } else {
      this.fillSpriteRect(adjustedCoord, rect.size, fill);
    }
  }

  private fillSolidColorRect(coord: Coord, size: Coord, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(coord[0], coord[1], size[0], size[1]);
  }

  private fillSpriteRect(coord: Coord, size: Coord, sprite: Sprite) {
    this.withClippedRegion({ coord, size }, () => {
      const [width, height] = size;
      for (let x = 0; x < width; x += sprite.size[0]) {
        for (let y = 0; y < height; y += sprite.size[1]) {
          this.drawSprite(sprite, coordAdd(coord, [x, y]));
        }
      }
    });
  }

  withClippedRegion({ coord, size }: Rect, fn: () => void) {
    this.ctx.save();
    this.ctx.rect(coord[0], coord[1], size[0], size[1]);
    this.ctx.clip();
    fn();
    this.ctx.restore();
  }

  private isFixed(opts?: DrawSpriteOptions): boolean {
    return opts?.fixed ?? this.fixed;
  }

  drawText(text: string | number, coord: Coord, style: TextStyle = {}) {
    // We're using 9px font, but we're better off leaving 1px extra room at the top
    // so that if we want to pad the text we can add the same amount of room to each side.
    const fixedCoord = coordAdd(coord, [0, 1]);

    this.setTextStyle(style);
    if (style.shadowColor) {
      this.drawTextShadow(String(text), fixedCoord, style.shadowColor);
    }
    this.ctx.fillText(String(text), fixedCoord[0], fixedCoord[1]);
  }

  private drawTextShadow(text: string, coord: Coord, shadowColor: string) {
    this.ctx.save();
    this.ctx.fillStyle = shadowColor;
    this.ctx.fillText(text, coord[0] + 0.5, coord[1] + 0.5);
    this.ctx.restore();
  }

  measureText(text: string | number, style: TextStyle = {}): Coord {
    this.setTextStyle(style);
    // for some reason the text is measured 1px larger than it actually is
    const { width } = this.ctx.measureText(String(text));
    return [width - 1, style.size === "small" ? 5 : 10]; // Report 9px font as 10px (see comment above)
  }

  private setTextStyle({ size, color, align }: TextStyle) {
    if (size === "small") {
      this.ctx.font = "4.5px NineteenNinetySix";
    } else {
      this.ctx.font = "9px NineteenNinetySix";
    }
    this.ctx.fillStyle = color ?? "#000";
    this.ctx.textAlign = align ?? "left";
  }

  saveBg() {
    this.bg = this.ctx.getImageData(0, 0, this.virtualSize[0] * this.scale, this.virtualSize[1] * this.scale);
  }

  centerTo(coord: Coord, world: GameWorld) {
    const halfScreenSize: Coord = coordDiv(this.virtualSize, [2, 2]);

    this.offset = coordConstrain(
      coordSub(coord, halfScreenSize),
      { coord: [0, 0], size: coordSub(world.size(), this.virtualSize) },
    );
  }

  restoreBg() {
    if (this.bg) {
      this.ctx.putImageData(this.bg, 0, 0);
    }
  }

  getOffset(): Coord {
    return this.offset;
  }

  getSize(): Coord {
    return this.virtualSize;
  }
}
