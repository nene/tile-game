import { Coord } from "./Coord";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { SpriteSheet } from "./SpriteSheet";

export enum GrassPlantType {
  wheat = "wheat",
  cabbage = "cabbage",
  pepper = "pepper",
  marygold = "marygold",
}

export class GrassPlant implements GameObject {
  constructor(private spriteSheet: SpriteSheet, private coord: Coord) {
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
