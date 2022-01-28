import { sortBy } from "lodash";
import { Noise } from "../utils/Noise";
import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";
import { isSmallGameItem, SmallGameItem } from "../items/GameItem";

export class Table implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;
  private noise = new Noise();

  constructor(private coord: Coord, private sittingDir: "LTR" | "RTL" = "LTR") {
    this.sprite = SpriteLibrary.getSprite("table");
    this.inventory = new StorageInventory({
      size: 24,
    });
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
    this.itemCoords().forEach(([item, coord], i) => {
      screen.drawSprite(item.getSmallSprite(), coord);
    });
  }

  private itemCoords(): [SmallGameItem, Coord][] {
    const itemCoordPairs: [SmallGameItem, Coord][] = this.inventory.allItems()
      .filter(isSmallGameItem)
      .map((item, i) => {
        const index = Math.floor(this.noise.random(i) * glassPositions.length);
        const offset = glassPositions[index];
        return [item, coordAdd(this.coord, coordAdd(offset, [0, -12]))];
      });
    return sortBy(itemCoordPairs, ([_, coord]) => coord[1]);
  }

  getSittingPositions(): Coord[] {
    const chairIndexes = this.sittingDir === "LTR" ? [0, 1, 2, 3] : [3, 2, 1, 0];
    return chairIndexes.map((i) => coordAdd(this.coord, coordAdd([8, -2], [i * 16, 0])));
  }

  getInventory(): StorageInventory {
    return this.inventory;
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
    return { coord: [0, -6], size: [64, 32] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [64, 26] };
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [109, 92],
      gridSize: [6, 4],
      headline: { title: "Laud", description: "Siin võib vedeleda tühju šoppeneid." },
      onClose: () => ui.hideInventory(),
    }));
  }
}

export const isTable = (obj: GameObject): obj is Table => obj instanceof Table;

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
  [5 + 9 * 0, 5],
  [5 + 9 * 1, 5],
  [5 + 9 * 2, 5],
  [5 + 9 * 3, 5],
  [5 + 9 * 4, 5],
  [5 + 9 * 5, 5],
  // 3rd row
  [9 * 0, 10],
  [9 * 1, 10],
  [9 * 2, 10],
  [9 * 3, 10],
  [9 * 4, 10],
  [9 * 5, 10],
  [9 * 6, 10],
  // 4th row
  [5 + 9 * 0, 15],
  [5 + 9 * 1, 15],
  [5 + 9 * 2, 15],
  [5 + 9 * 3, 15],
  [5 + 9 * 4, 15],
  [5 + 9 * 5, 15],
];

