import { Alignment, Coord, coordAdd, Rect, rectAlign } from "../Coord";
import { Paintable, PixelScreen } from "../PixelScreen";
import { read9SliceSprites } from "../sprites/read9SliceSprites";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import ribbonFrameJson from "../sprites/data/ribbon-frame.json";

type EdgeAlignment = "top" | "bottom" | "left" | "right";

export class DecoratedFrame implements Paintable {
  private static ribbonSlices?: Record<Alignment, Sprite>;

  private static getRibbonSlices() {
    if (!DecoratedFrame.ribbonSlices) {
      DecoratedFrame.ribbonSlices = read9SliceSprites(SpriteLibrary.getSprite("ribbon-frame").image, ribbonFrameJson);
    }
    return DecoratedFrame.ribbonSlices;
  }

  private sprites: Record<Alignment, Sprite>;

  constructor(private rect: Rect) {
    this.sprites = DecoratedFrame.getRibbonSlices();
  }

  paint(screen: PixelScreen): void {
    this.drawEdge(screen, "top");
    this.drawEdge(screen, "right");
    this.drawEdge(screen, "bottom");
    this.drawEdge(screen, "left");
    this.drawCorners(screen);
  }

  private drawEdge(screen: PixelScreen, align: EdgeAlignment): void {
    const { axis, startCoord, availableSize } = this.edgeConfig(align);
    const sprite = this.sprites[align];
    const size = sprite.size[axis];
    let i = 0;
    while (size * (i + 1) <= availableSize) {
      const offset: Coord = axis === 0 ? [size * i, 0] : [0, size * i];
      screen.drawSprite(sprite, coordAdd(startCoord, offset));
      i++;
    }
  }

  private edgeConfig(edge: EdgeAlignment) {
    switch (edge) {
      case "top": {
        const { coord, size } = this.alignmentRect("top-left");
        return {
          axis: 0,
          startCoord: coordAdd(coord, [size[0], 0]),
          availableSize: this.availableSize(0),
        };
      }
      case "bottom": {
        const { coord, size } = this.alignmentRect("bottom-left");
        return {
          axis: 0,
          startCoord: coordAdd(coord, [size[0], 0]),
          availableSize: this.availableSize(0),
        };
      }
      case "left": {
        const { coord, size } = this.alignmentRect("top-left");
        return {
          axis: 1,
          startCoord: coordAdd(coord, [0, size[1]]),
          availableSize: this.availableSize(1),
        };
      }
      case "right": {
        const { coord, size } = this.alignmentRect("top-right");
        return {
          axis: 1,
          startCoord: coordAdd(coord, [0, size[1]]),
          availableSize: this.availableSize(1),
        };
      }
    }
  }

  private availableSize(axis: 0 | 1): number {
    return this.rect.size[axis] - this.sprites["top-left"].size[axis] - this.sprites["bottom-right"].size[axis];
  }

  private drawCorners(screen: PixelScreen): void {
    (["top-left", "top-right", "bottom-left", "bottom-right"] as Alignment[]).forEach((align) => {
      screen.drawSprite(this.sprites[align], this.alignmentRect(align).coord);
    });
  }

  private alignmentRect(alignment: Alignment): Rect {
    return rectAlign(this.sprites[alignment], this.rect, alignment);
  }
}
