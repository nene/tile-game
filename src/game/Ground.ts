import { GameGrid } from "./GameGrid";
import { PixelScreen } from "./PixelScreen";
import { SurfaceSpriteSheet } from "./SurfaceSpriteSheet";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";
import { SpriteLibrary } from "./SpriteLibrary";
import { Coord, coordAdd } from "./Coord";

export class Ground {
  private stones: SurfaceSpriteSheet;
  private water: SurfaceSpriteSheet;

  constructor(private grid: GameGrid, private surface: SurfaceMap, sprites: SpriteLibrary) {
    this.stones = new SurfaceSpriteSheet(sprites.get('stones'), SurfaceType.stone);
    this.water = new SurfaceSpriteSheet(sprites.get('water'), SurfaceType.water);
  }

  paint(screen: PixelScreen) {
    // depending on surrounding tiles, decide the type of stone tile and paint it
    for (let y = -1; y < this.grid.getRows(); y++) {
      for (let x = -1; x < this.grid.getCols(); x++) {
        this.maybeDrawSprite(screen, this.stones, [x, y]);
        this.maybeDrawSprite(screen, this.water, [x, y]);
      }
    }
  }

  maybeDrawSprite(screen: PixelScreen, spriteSheet: SurfaceSpriteSheet, coord: Coord) {
    const stoneSprite = spriteSheet.getSprite(coord, this.surface);
    if (stoneSprite) {
      screen.drawSprite(
        stoneSprite,
        coordAdd(this.grid.tileToScreenCoord(coord), [8, 8]),
      );
    }
  }
}
