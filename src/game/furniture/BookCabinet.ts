import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { Book } from "../items/Book";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

const WITH_BOOK: Coord = [0, 0];
const WITHOUT_BOOK: Coord = [1, 0];

export class BookCabinet implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("book-cabinet", [0, 0]);
    this.inventory = new StorageInventory({
      size: 1,
      items: [new Book()],
      isAcceptingItem: (item) => item instanceof Book,
    });
  }

  tick() { }

  paint(screen: PixelScreen) {
    const spriteCoord = this.inventory.isFull() ? WITH_BOOK : WITHOUT_BOOK;
    screen.drawSprite(SpriteLibrary.getSprite("book-cabinet", spriteCoord), this.coord);
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
    return { coord: [0, -15], size: [16, 24] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [16, 8] };
  }

  isInteractable() {
    return true;
  }

  onInteract(ui: UiController) {
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [120, 87],
      gridSize: [1, 1],
      headline: { title: "Majaraamatu laud", description: "Kirjuta sisse kui konventi tuled." },
      onClose: () => ui.hideInventory(),
    }));
  }
}
