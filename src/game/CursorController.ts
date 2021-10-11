import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { Coord } from "./Coord";
import { GameEvent } from "./GameEvent";
import { SpriteSheet } from "./sprites/SpriteSheet";

export class CursorController {
  private mouseCoord: Coord = [-16, -16];
  private cursor: SpriteSheet;
  private cursorType: 0 | 1 = 0;

  constructor() {
    this.cursor = SpriteLibrary.get("cursor");
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.cursor.getSprite([this.cursorType, 0]), this.mouseCoord);
  }

  handleGameEvent({ type, coord }: GameEvent): boolean | undefined {
    if (type === "mousemove") {
      this.mouseCoord = coord;
    }
    return undefined;
  }

  setHighlighted(highlighted: boolean) {
    this.cursorType = highlighted ? 1 : 0;
  }
}
