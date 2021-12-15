import { Coord, screenToTileCoord, tileToScreenRect } from "../Coord";
import { isBackgroundLayer, isBuildingsLayer, isEntityLayer, isForegroundLayer, isWallLayer, Level } from "./Level";
import { Wall } from "../furniture/Wall";
import { detectWallSections } from "./detectWallSections";
import { TiledBackground } from "./TiledBackground";
import { createFurniture } from "../furniture/createFurniture";
import { GameObject } from "../GameObject";

export class TiledLevelFactory {
  private width: number;
  private height: number;

  constructor(private level: Level) {
    [this.width, this.height] = screenToTileCoord([level.pxWid, level.pxHei]);
  }

  getBackground(): TiledBackground {
    const tiles = this.level.layerInstances.find(isBackgroundLayer)?.gridTiles ?? [];
    return new TiledBackground(tiles, 'cfe-bg');
  }

  getBuildings(): TiledBackground {
    const tiles = this.level.layerInstances.find(isBuildingsLayer)?.gridTiles ?? [];
    return new TiledBackground(tiles, 'buildings');
  }

  getForeground(): TiledBackground {
    const tiles = this.level.layerInstances.find(isForegroundLayer)?.gridTiles ?? [];
    return new TiledBackground(tiles, 'cfe-bg');
  }

  getFurniture(): GameObject[] {
    const entities = this.level.layerInstances.find(isEntityLayer)?.entityInstances ?? [];
    return entities
      .map((entity) => {
        return createFurniture(entity.__identifier, entity.px, entity.fieldInstances)
      });
  }

  getGridSize(): Coord {
    return [this.width, this.height];
  }

  private getWallMap(): boolean[][] {
    const walls = this.level.layerInstances.find(isWallLayer)?.intGridCsv ?? [];

    const map: boolean[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(Boolean(walls[y * this.width + x]));
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
