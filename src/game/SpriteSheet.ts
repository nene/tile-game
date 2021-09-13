import { Coord } from "./Coord";
import { Sprite } from "./Sprite";

export class SpriteSheet {
  constructor(
    private image: HTMLImageElement,
    private size: Coord,
    private colsRows: Coord
  ) {
  }

  getSprite(colRow: Coord): Sprite {
    return {
      image: this.image,
      coord: this.getSpriteCoord(colRow),
      size: this.size,
    };
  }

  private getSpriteCoord([col, row]: Coord): Coord {
    return [this.size[0] * col, this.size[1] * row];
  }

  getSpriteSize(): Coord {
    return this.size;
  }

  getCount(): number {
    return this.colsRows[0] * this.colsRows[1];
  }
}
