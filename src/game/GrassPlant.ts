import { Coord, coordAdd } from "./Coord";
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
  private coord: Coord;
  private offset: Coord = [-8, -16];

  constructor(private spriteSheet: SpriteSheet, coord: Coord) {
    this.coord = coord;
  }

  tick() {
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.spriteSheet.getSprite([0, 0]), coordAdd(this.coord, this.offset));
  }

  zIndex(): number {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }
}
