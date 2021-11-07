import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { BookInventoryView } from "../inventory/BookInventoryView";
import { StorageInventory } from "../inventory/StorageInventory";
import { Book, isBook } from "../items/Book";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

const WITH_BOOK: Coord = [0, 0];
const WITHOUT_BOOK: Coord = [1, 0];

export class BookCabinet implements GameObject {
  private inventory: StorageInventory;

  constructor(private coord: Coord) {
    this.inventory = new StorageInventory({
      size: 1,
      items: [new Book()],
      isAcceptingItem: isBook,
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
    ui.showInventory(new BookInventoryView({
      inventory: this.inventory,
      windowSize: [200, 120],
      gridSize: [1, 1],
      headline: { title: "Majaraamatu laud", description: "Kirjuta sisse kui konventi tuled." },
      onClose: () => ui.hideInventory(),
    }));
  }

  getBook(): Book | undefined {
    const book = this.inventory.itemAt(0);
    return book && isBook(book) ? book : undefined;
  }
}

export const isBookCabinet = (obj: GameObject): obj is BookCabinet => obj instanceof BookCabinet;
