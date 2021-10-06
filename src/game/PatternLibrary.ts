import { Coord } from "./Coord";
import { createOffScreenCanvas } from "./createOffScreenCanvas";
import { SpriteLibrary, SpriteName } from "./sprites/SpriteLibrary";

export class PatternLibrary {
  private static patterns: Record<string, CanvasPattern> = {};

  public static get(name: SpriteName, coord: Coord): CanvasPattern {
    const key = name + "-" + coord.join(",");
    if (!this.patterns[key]) {
      this.patterns[key] = this.createPattern(name, coord);
    }
    return this.patterns[key];
  }

  private static createPattern(name: SpriteName, coord: Coord): CanvasPattern {
    const sprite = SpriteLibrary.get(name).getSprite(coord);
    const ctx = createOffScreenCanvas(sprite.size);
    ctx.drawImage(
      sprite.image,
      sprite.coord[0],
      sprite.coord[1],
      sprite.size[0],
      sprite.size[1],
      0,
      0,
      sprite.size[0],
      sprite.size[1]
    );
    const pattern = ctx.createPattern(ctx.canvas, "repeat");
    if (!pattern) {
      throw new Error("Failed creating pattern: " + name + " " + coord);
    }
    return pattern;
  }
}
