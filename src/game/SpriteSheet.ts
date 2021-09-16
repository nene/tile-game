import { Coord } from "./Coord";
import { Sprite } from "./Sprite";

interface SpriteSheetConfig {
  size: Coord;
  colsRows: Coord;
  offset?: Coord;
}

export class SpriteSheet {
  private size: Coord;
  private colsRows: Coord;
  private offset: Coord;

  constructor(private image: HTMLImageElement, config: SpriteSheetConfig) {
    this.size = config.size;
    this.colsRows = config.colsRows;
    this.offset = config.offset ?? [0, 0];
  }

  getSprite(colRow: Coord): Sprite {
    return {
      image: this.image,
      coord: this.getSpriteCoord(colRow),
      size: this.size,
      offset: this.offset,
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
