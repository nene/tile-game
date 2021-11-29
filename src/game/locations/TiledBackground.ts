import { Coord, screenToTileCoord, tileToScreenCoord, tileToScreenRect } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { LocationBackground } from "./LocationBackground";
import { isIntLayer, isTileLayer, Level, Tile } from "./Level";
import { Wall } from "../furniture/Wall";
import { detectWallSections } from "./detectWallSections";

export class TiledBackground implements LocationBackground {
  private bg: SpriteSheet;
  private width: number;
  private height: number;
  private tiles: Tile[];
  private walls: number[];

  constructor(private level: Level) {
    this.bg = SpriteLibrary.get('cfe-bg');
    [this.width, this.height] = screenToTileCoord([level.pxWid, level.pxHei]);
    this.tiles = level.layerInstances.find(isTileLayer)?.gridTiles ?? [];
    this.walls = level.layerInstances.find(isIntLayer)?.intGridCsv ?? [];
  }

  paint(screen: PixelScreen) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        screen.drawSprite(this.lookupSprite([x, y]), tileToScreenCoord([x, y]));
      }
    }
  }

  private lookupSprite(coord: Coord): Sprite {
    return this.bg.getSprite(this.lookupTileCoord(coord));
  }

  private lookupTileCoord([x, y]: Coord): Coord {
    return screenToTileCoord(this.tiles[y * this.width + x].src);
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
