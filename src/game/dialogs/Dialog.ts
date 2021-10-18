import { isCoordInRect, Rect, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { Character } from "../npc/Character";
import { PixelScreen } from "../PixelScreen";
import { Window } from "../ui/Window";
import { DialogContent } from "./DialogContent";

interface DialogConfig {
  character: Character;
  content: DialogContent;
  onClose: () => void;
}

export class Dialog {
  private window: Window;
  private content: DialogContent;
  private onClose: () => void;

  constructor({ character, content, onClose }: DialogConfig) {
    this.content = content;
    this.onClose = onClose;
    this.window = new Window({
      headline: {
        title: character.name + ":",
        description: "",
      },
      coord: [60, 100],
      size: [200, 100],
      onClose,
    });
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.content.paint(screen, rectGrow(this.window.contentAreaRect(), [-2, -2]))
  }

  getRect(): Rect {
    return this.window.getRect();
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.window.handleGameEvent(event);
    this.content.handleGameEvent(event);

    if (event.type === "click") {
      if (!isCoordInRect(event.coord, this.getRect())) {
        this.onClose();
      }
      return true;
    }

    return undefined;
  }
}
