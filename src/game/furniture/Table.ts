import { shuffle, sortBy } from "lodash";
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
  private positions: Coord[];

  constructor(private coord: Coord, private sittingDir: "LTR" | "RTL" = "LTR") {
    this.sprite = SpriteLibrary.getSprite("table");
    this.positions = [...firstTriangle, ...secondTriangle, ...shuffle(triangleLeftovers)];
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
        const offset = this.positions[i];
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
  [9 * 0, 0], //#0  7
  [9 * 1, 0], //#1  8
  [9 * 2, 0], //#2  9
  [9 * 3, 0], //#3  10
  [9 * 4, 0], //#4  !1
  [9 * 5, 0],
  [9 * 6, 0],
  // 2nd row
  [5 + 9 * 0, 5], //#7  4
  [5 + 9 * 1, 5], //#8  5
  [5 + 9 * 2, 5], //#9  6
  [5 + 9 * 3, 5], //#10  !2
  [5 + 9 * 4, 5], //#11  !3
  [5 + 9 * 5, 5],
  // 3rd row
  [9 * 0, 10],
  [9 * 1, 10], //#14  2
  [9 * 2, 10], //#15  3
  [9 * 3, 10], //#16  !4
  [9 * 4, 10], //#17  !5
  [9 * 5, 10], //#18  !6
  [9 * 6, 10],
  // 4th row
  [5 + 9 * 0, 15],
  [5 + 9 * 1, 15], //#21  1
  [5 + 9 * 2, 15], //#22  !7
  [5 + 9 * 3, 15], //#23  !8
  [5 + 9 * 4, 15], //#24  !9
  [5 + 9 * 5, 15], //#25  !10
];

const firstTriangle: Coord[] = [
  glassPositions[21],
  glassPositions[14],
  glassPositions[15],
  glassPositions[7],
  glassPositions[8],
  glassPositions[9],
  glassPositions[0],
  glassPositions[1],
  glassPositions[2],
  glassPositions[3],
];

const secondTriangle: Coord[] = [
  glassPositions[4],
  glassPositions[10],
  glassPositions[11],
  glassPositions[16],
  glassPositions[17],
  glassPositions[18],
  glassPositions[22],
  glassPositions[23],
  glassPositions[24],
  glassPositions[25],
];

const triangleLeftovers: Coord[] = [
  glassPositions[5],
  glassPositions[6],
  glassPositions[12],
  glassPositions[13],
  glassPositions[19],
  glassPositions[20],
];
