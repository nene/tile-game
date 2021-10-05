import { Coord, coordDiv } from "./Coord";

type GameMouseEventType = "click" | "mousemove" | "mousedown" | "mouseup";

interface GameMouseEvent {
  type: GameMouseEventType;
  coord: Coord;
}

interface GameWheelEvent {
  type: "wheel";
  coord: Coord;
  wheelDelta: Coord;
}

export type GameEvent = GameMouseEvent | GameWheelEvent;
export type GameEventType = GameMouseEventType | "wheel";

export class GameEventFactory {
  constructor(private scale: number) { }

  createEvent(type: GameEventType, rawCoord: Coord, wheelDelta?: Coord): GameEvent {
    if (type === "wheel") {
      if (!wheelDelta) {
        throw new Error("'wheel' event is missing wheelDelta");
      }
      return { type, coord: this.toPixelScale(rawCoord), wheelDelta: coordDiv(wheelDelta, [16, 16]) };
    } else {
      return { type, coord: this.toPixelScale(rawCoord) };
    }
  }

  private toPixelScale([x, y]: Coord): Coord {
    return [Math.floor(x / this.scale), Math.floor(y / this.scale)];
  }
}
