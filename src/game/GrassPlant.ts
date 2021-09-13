import { Coord, coordAdd } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
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
  private spriteSheet: SpriteSheet;
  private offset: Coord = [-8, -16];

  constructor(images: ImageLibrary, type: GrassPlantType, coord: Coord) {
    const img = images.get(type);
    this.spriteSheet = new SpriteSheet(img, [32, 32], [1, 6]);
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
}
