import { Coord, coordDiv } from "./Coord";

type GameMouseEventType = "click" | "rightclick" | "mousemove" | "mousedown" | "mouseup";

interface GameMouseEvent {
  type: GameMouseEventType;
  coord: Coord;
}

interface GameWheelEvent {
  type: "wheel";
  coord: Coord;
  wheelDelta: Coord;
}

export interface GameKeyEvent {
  type: "keyup" | "keydown";
  key: "UP" | "DOWN" | "LEFT" | "RIGHT" | "OPINIONS" | "?";
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

  createKeyboardEvent(type: "keyup" | "keydown", key: string): GameKeyEvent {
    switch (key) {
      case "ArrowLeft":
      case "a":
        return { type, key: "LEFT" };
      case "ArrowRight":
      case "d":
        return { type, key: "RIGHT" };
      case "ArrowUp":
      case "w":
        return { type, key: "UP" };
      case "ArrowDown":
      case "s":
        return { type, key: "DOWN" };
      case "e":
        return { type, key: "OPINIONS" };
      default:
        return { type, key: "?" };
    }
  }

  private toPixelScale([x, y]: Coord): Coord {
    return [Math.floor(x / this.scale), Math.floor(y / this.scale)];
  }
}
