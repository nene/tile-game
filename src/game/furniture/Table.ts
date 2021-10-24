import { sortBy } from "lodash";
import SimplexNoise from "simplex-noise";
import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { BeerGlass } from "../items/BeerGlass";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class Table implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;
  private noise = new SimplexNoise();

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("table");
    this.inventory = new StorageInventory({
      size: 10,
      items: [new BeerGlass(), new BeerGlass(), new BeerGlass(), new BeerGlass(), new BeerGlass(), new BeerGlass(), new BeerGlass(), new BeerGlass()],
    });
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
    this.itemCoords().forEach(([item, coord], i) => {
      screen.drawSprite(item.getSmallSprite(), coord);
    });
  }

  private itemCoords(): [BeerGlass, Coord][] {
    const itemCoordPairs: [BeerGlass, Coord][] = this.inventory.allItems()
      .filter((item): item is BeerGlass => item instanceof BeerGlass)
      .map((item, i) => {
        const rnd = (this.noise.noise2D(i, 1) + 1) / 2;
        const index = Math.floor(rnd * glassPositions.length);
        const offset = glassPositions[index];
        return [item, coordAdd(this.coord, coordAdd(offset, [2, 5]))];
      });
    return sortBy(itemCoordPairs, ([_, coord]) => coord[1]);
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return true;
  }

  hitBox(): Rect {
    return { coord: [0, -6], size: [64, 17] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [64, 16] };
  }

  isInteractable() {
    return true;
  }

  onInteract(ui: UiController) {
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [112, 66],
      gridSize: [5, 2],
      headline: { title: "Laud", description: "Siin võib vedeleda tühju šoppeneid." },
      onClose: () => ui.hideInventory(),
    }));
  }
}

// Positions for maximum of 26 glasses on the table
const glassPositions: Coord[] = [
  // 1st row
  [9 * 0, 0],
  [9 * 1, 0],
  [9 * 2, 0],
  [9 * 3, 0],
  [9 * 4, 0],
  [9 * 5, 0],
  [9 * 6, 0],
  // 2nd row
  [5 + 9 * 0, 4],
  [5 + 9 * 1, 4],
  [5 + 9 * 2, 4],
  [5 + 9 * 3, 4],
  [5 + 9 * 4, 4],
  [5 + 9 * 5, 4],
  // 3rd row
  [9 * 0, 8],
  [9 * 1, 8],
  [9 * 2, 8],
  [9 * 3, 8],
  [9 * 4, 8],
  [9 * 5, 8],
  [9 * 6, 8],
  // 4th row
  [5 + 9 * 0, 12],
  [5 + 9 * 1, 12],
  [5 + 9 * 2, 12],
  [5 + 9 * 3, 12],
  [5 + 9 * 4, 12],
  [5 + 9 * 5, 12],
];
