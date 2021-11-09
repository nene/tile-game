import { Coord, coordDiv } from "./Coord";
import { SCREEN_SCALE } from "./ui/screen-size";

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
  key: "UP" | "DOWN" | "LEFT" | "RIGHT" | "OPINIONS" | "SKILLS" | "?";
}

export type GameEvent = GameMouseEvent | GameWheelEvent;
export type GameEventType = GameMouseEventType | "wheel";

export class GameEventFactory {
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
      case "f":
        return { type, key: "SKILLS" };
      default:
        return { type, key: "?" };
    }
  }

  private toPixelScale([x, y]: Coord): Coord {
    return [Math.floor(x / SCREEN_SCALE), Math.floor(y / SCREEN_SCALE)];
  }
}
