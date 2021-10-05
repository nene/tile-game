import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { Coord } from "./Coord";
import { Sprite } from "./Sprite";
import { GameEvent } from "./GameEvent";

export class CursorController {
  private mouseCoord: Coord = [-16, -16];
  private cursor: Sprite;

  constructor() {
    this.cursor = SpriteLibrary.get("cursor").getSprite([0, 0]);
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.cursor, this.mouseCoord);
  }

  handleMouseEvent({ type, coord }: GameEvent): boolean | undefined {
    if (type === "mousemove") {
      this.mouseCoord = coord;
    }
    return undefined;
  }
}
