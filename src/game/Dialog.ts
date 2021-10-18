import { coordAdd, isCoordInRect, Rect, rectGrow } from "./Coord";
import { GameEvent } from "./GameEvent";
import { Character } from "./npc/Character";
import { PixelScreen } from "./PixelScreen";
import { fitText } from "./ui/fitText";
import { UI_SHADOW_COLOR } from "./ui/ui-utils";
import { Window } from "./ui/Window";

interface DialogConfig {
  character: Character;
  text: string;
  onClose: () => void;
}

export class Dialog {
  private window: Window;
  private text: string;
  private onClose: () => void;

  constructor({ character, text, onClose }: DialogConfig) {
    this.text = text;
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
    this.drawContent(this.text, screen);
  }

  private drawContent(text: string, screen: PixelScreen) {
    const style = { color: "#000", shadowColor: UI_SHADOW_COLOR };
    const { coord, size } = rectGrow(this.window.contentAreaRect(), [-2, -2]);
    const lineHeight = 12;
    fitText(screen, size, text, style).forEach((line, i) => {
      screen.drawText(line, coordAdd(coord, [0, lineHeight * i]),);
    });
  }

  getRect(): Rect {
    return this.window.getRect();
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.window.handleGameEvent(event);

    if (event.type === "click") {
      if (!isCoordInRect(event.coord, this.getRect())) {
        this.onClose();
      }
      return true;
    }

    return undefined;
  }
}
