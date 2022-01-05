import { Coord, screenToTileCoord, tileToScreenRect } from "../Coord";
import { isEntityLayer, isGrassLayer, isTileLayerWithName, isWallLayer, Level } from "./Level";
import { Wall } from "../furniture/Wall";
import { detectWallSections } from "./detectWallSections";
import { TiledBackground } from "./TiledBackground";
import { createFurniture } from "../furniture/createFurniture";
import { GameObject } from "../GameObject";
import { SpriteName } from "../sprites/SpriteLibrary";

export class TiledLevelFactory {
  private width: number;
  private height: number;

  constructor(private level: Level) {
    [this.width, this.height] = screenToTileCoord([level.pxWid, level.pxHei]);
  }

  getBackground(): TiledBackground {
    return this.createTiledBackground("Background", "bg");
  }

  getBuildings(): TiledBackground {
    return this.createTiledBackground("Buildings", "buildings");
  }

  getForeground(): TiledBackground {
    return this.createTiledBackground("Foreground", "bg");
  }

  private createTiledBackground(layerName: string, spriteName: SpriteName) {
    const tiles = this.level.layerInstances.find(isTileLayerWithName(layerName))?.gridTiles ?? [];
    return new TiledBackground(tiles, spriteName);
  }

  getGrass(): TiledBackground {
    const tiles = this.level.layerInstances.find(isGrassLayer)?.autoLayerTiles ?? [];
    return new TiledBackground(tiles, "grass", [8, 8]);
  }

  getFurniture(): GameObject[] {
    const entities = this.level.layerInstances.find(isEntityLayer)?.entityInstances ?? [];
    return entities
      .map((entity) => {
        return createFurniture(
          entity.__identifier,
          { coord: entity.px, size: [entity.width, entity.height] },
          entity.fieldInstances,
        );
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
