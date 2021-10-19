import { isCoordInRect, Rect, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { Character } from "../npc/Character";
import { PixelScreen } from "../PixelScreen";
import { Window } from "../ui/Window";
import { DialogContent } from "./DialogContent";

interface DialogConfig {
  character: Character;
  createContent: (rect: Rect) => DialogContent,
  onClose?: () => void;
}

export class Dialog {
  private window: Window;
  private content: DialogContent;
  private onClose?: () => void;

  constructor({ character, createContent, onClose }: DialogConfig) {
    this.onClose = onClose;
    this.window = new Window({
      headline: {
        title: character.name + ":",
      },
      coord: [60, 98],
      size: [200, 102],
      onClose: onClose
    });
    this.content = createContent(rectGrow(this.window.contentAreaRect(), [-2, -2]));
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.content.paint(screen)
  }

  getRect(): Rect {
    return this.window.getRect();
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.window.handleGameEvent(event);
    this.content.handleGameEvent(event);

    if (event.type === "click") {
      if (!isCoordInRect(event.coord, this.getRect())) {
        this.onClose && this.onClose();
      }
      return true;
    }

    return undefined;
  }
}
