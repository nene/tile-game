import { Coord, coordMul } from "../Coord";
import { Sprite } from "./Sprite";

export interface SpriteSheetConfig {
  size: Coord;
  colsRows?: Coord;
  offset?: Coord;
}

export class SpriteSheet {
  private size: Coord;
  private colsRows: Coord;
  private offset: Coord;
  private sheetSize: Coord;

  constructor(private image: HTMLImageElement, config: SpriteSheetConfig) {
    this.size = config.size;
    this.colsRows = config.colsRows ?? [1, 1];
    this.offset = config.offset ?? [0, 0];
    this.sheetSize = coordMul(this.colsRows, config.size);
  }

  getSprite(colRow: Coord = [0, 0]): Sprite {
    return {
      image: this.image,
      coord: this.getSpriteCoord(colRow),
      size: this.size,
      offset: this.offset,
      sheetSize: this.sheetSize,
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
