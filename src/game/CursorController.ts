import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { Coord, coordAdd } from "./Coord";
import { GameEvent } from "./GameEvent";
import { SpriteSheet } from "./sprites/SpriteSheet";

enum CursorType {
  pointer = 0,
  hand = 1,
}

export class CursorController {
  private mouseCoord: Coord = [-16, -16];
  private cursor: SpriteSheet;
  private cursorType = CursorType.pointer;
  private offset: Coord = [0, 0];

  constructor() {
    this.cursor = SpriteLibrary.get("cursor");
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.cursor.getSprite([this.cursorType, 0]), coordAdd(this.mouseCoord, this.offset));
  }

  handleGameEvent({ type, coord }: GameEvent): boolean | undefined {
    if (type === "mousemove") {
      this.mouseCoord = coord;
    }
    return undefined;
  }

  setHighlighted(highlighted: boolean) {
    this.cursorType = highlighted ? CursorType.hand : CursorType.pointer;
    this.offset = highlighted ? [-2, 0] : [0, 0];
  }

  getCoord(): Coord {
    return this.mouseCoord;
  }
}
