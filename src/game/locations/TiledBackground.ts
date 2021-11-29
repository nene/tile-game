import { Coord, screenToTileCoord, tileToScreenRect } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { LocationBackground } from "./LocationBackground";
import { isBackgroundLayer, isWallLayer, Level, Tile } from "./Level";
import { Wall } from "../furniture/Wall";
import { detectWallSections } from "./detectWallSections";

export class TiledBackground implements LocationBackground {
  private bg: SpriteSheet;
  private width: number;
  private height: number;
  private tiles: Tile[];
  private walls: number[];

  constructor(level: Level) {
    this.bg = SpriteLibrary.get('cfe-bg');
    [this.width, this.height] = screenToTileCoord([level.pxWid, level.pxHei]);
    this.tiles = level.layerInstances.find(isBackgroundLayer)?.gridTiles ?? [];
    this.walls = level.layerInstances.find(isWallLayer)?.intGridCsv ?? [];
  }

  paint(screen: PixelScreen) {
    for (const tile of this.tiles) {
      screen.drawSprite(this.bg.getSprite(screenToTileCoord(tile.src)), tile.px);
    }
  }

  getGridSize(): Coord {
    return [this.width, this.height];
  }

  private getWallMap(): boolean[][] {
    const map: boolean[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(Boolean(this.walls[y * this.width + x]));
      }
      map.push(row);
    }
    return map;
  }

  getWalls(): Wall[] {
    return detectWallSections(this.getWallMap())
      .map(tileToScreenRect)
      .map((rect) => new Wall(rect));
  }
}
