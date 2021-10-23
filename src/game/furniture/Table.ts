import { sortBy } from "lodash";
import SimplexNoise from "simplex-noise";
import { Coord, coordAdd, coordFloor, coordMul, Rect } from "../Coord";
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
      items: [new BeerGlass(), new BeerGlass()],
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
        const x = (this.noise.noise2D(i, 1) + 1) / 2;
        const y = (this.noise.noise2D(1, i) + 1) / 2;
        const offset = coordFloor(coordAdd(coordMul([x, y], [60, 14]), [0, 5]));
        return [item, coordAdd(this.coord, offset)];
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
