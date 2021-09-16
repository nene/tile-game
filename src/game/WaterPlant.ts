import { Coord } from "./Coord";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { SpriteSheet } from "./SpriteSheet";

export enum WaterPlantType {
  reed = "reed",
  waterLily = "water-lily",
}

export class WaterPlant implements GameObject {
  private coord: Coord;

  constructor(private spriteSheet: SpriteSheet, coord: Coord) {
    this.coord = coord;
  }

  tick() {
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.spriteSheet.getSprite([0, 0]), this.coord);
  }

  zIndex(): number {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }
}
