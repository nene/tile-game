import { Coord, coordAdd, coordSub, Rect, rectOverlaps } from "./Coord";
import { Location } from "./locations/Location";
import { Sprite } from "./sprites/Sprite";
import { TextMeasurer } from "./ui/fitText";
import { SCREEN_SCALE, SCREEN_SIZE } from "./ui/screen-size";

export interface TextStyle {
  color?: string;
  size?: "small" | "medium";
  align?: "center" | "end" | "left" | "right" | "start";
  shadowColor?: string;
}

export interface Paintable {
  paint(screen: PixelScreen): void;
}

export class PixelScreen implements TextMeasurer {
  private ctx: CanvasRenderingContext2D;
  private size: Coord = SCREEN_SIZE;
  private offset: Coord = [0, 0];
  private bg?: ImageData;
  private fixed = false;

  constructor(ctx: CanvasRenderingContext2D, private offscreen?: PixelScreen) {
    this.ctx = ctx;
    this.ctx.scale(SCREEN_SCALE, SCREEN_SCALE);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.textBaseline = "top";
  }

  withFixedCoords(fn: () => void) {
    const oldFixed = this.fixed;
    this.fixed = true;
    fn();
    this.fixed = oldFixed;
  }

  // Helper for calling paint() method on multiple objects
  paint(objects: Paintable[]) {
    objects.forEach((obj) => obj.paint(this));
  }

  drawSprite(sprite: Sprite, coord: Coord) {
    const screenOffset: Coord = this.fixed ? [0, 0] : this.offset;

    if (rectOverlaps({ coord: coordAdd(coord, sprite.offset), size: sprite.size }, { coord: screenOffset, size: this.size })) {
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
    }
  }

  drawSprites(sprites: Sprite[], coord: Coord) {
    sprites.forEach((sprite) => {
      this.drawSprite(sprite, coord);
    });
  }

  drawRect(rect: Rect, fill: string | CanvasPattern) {
    const screenOffset: Coord = this.fixed ? [0, 0] : this.offset;

    const adjustedCoord = coordSub(rect.coord, screenOffset);
    this.ctx.fillStyle = fill;
    this.ctx.fillRect(adjustedCoord[0], adjustedCoord[1], rect.size[0], rect.size[1]);
  }

  getOffscreen(): PixelScreen {
    if (!this.offscreen) {
      throw new Error("This PixelScreen has no offscreen canvas");
    }
    return this.offscreen;
  }

  copyFromOffscreen(source: Rect, target: Coord) {
    this.ctx.drawImage(
      this.getOffscreen().getContext().canvas,
      source.coord[0] * SCREEN_SCALE,
      source.coord[1] * SCREEN_SCALE,
      source.size[0] * SCREEN_SCALE,
      source.size[1] * SCREEN_SCALE,
      target[0],
      target[1],
      source.size[0],
      source.size[1],
    );
  }

  drawText(text: string | number, coord: Coord, style: TextStyle = {}) {
    // We're using 9px font, but we're better off leaving 1px extra room at the top
    // so that if we want to pad the text we can add the same amount of room to each side.
    const fixedCoord = coordAdd(coord, [0, 1]);

    if (style.shadowColor) {
      this.setTextStyle({ ...style, color: style.shadowColor });
      this.ctx.fillText(String(text), fixedCoord[0] + 0.5, fixedCoord[1] + 0.5);
    }
    this.setTextStyle(style);
    this.ctx.fillText(String(text), fixedCoord[0], fixedCoord[1]);
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
    this.bg = this.ctx.getImageData(0, 0, this.size[0] * SCREEN_SCALE, this.size[1] * SCREEN_SCALE);
  }

  centerTo(coord: Coord, location: Location) {
    this.offset = worldOffset(coord, {
      screenSize: this.size,
      worldSize: location.getSize(),
    });
  }

  restoreBg() {
    if (this.bg) {
      this.ctx.putImageData(this.bg, 0, 0);
    }
  }

  getOffset(): Coord {
    return this.offset;
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}

export interface WorldOffsetOpts {
  screenSize: Coord;
  worldSize: Coord;
}

export function worldOffset([x, y]: Coord, { screenSize, worldSize }: WorldOffsetOpts): Coord {
  return [
    axisOffset(x, screenSize[0], worldSize[0]),
    axisOffset(y, screenSize[1], worldSize[1]),
  ];
}

function axisOffset(x: number, screenSize: number, worldSize: number): number {
  if (worldSize - screenSize < 0) {
    return Math.floor((worldSize - screenSize) / 2);
  }

  const halfScreen = Math.floor(screenSize / 2);
  if (x <= halfScreen) {
    return 0;
  }
  if (x >= worldSize - halfScreen) {
    return worldSize - screenSize;
  }
  return x - halfScreen;
}
