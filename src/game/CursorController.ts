import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { Coord } from "./Coord";
import { Sprite } from "./Sprite";

export class CursorController {
  private mouseCoord: Coord = [-16, -16];
  private cursor: Sprite;

  constructor() {
    this.cursor = SpriteLibrary.get("cursor").getSprite([0, 0]);
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.cursor, this.mouseCoord);
  }

  handleMouseEvent(type: string, screenCoord: Coord, wheelDelta?: Coord): boolean | undefined {
    if (type === "mousemove") {
      this.mouseCoord = screenCoord;
    }
    return undefined;
  }
}
