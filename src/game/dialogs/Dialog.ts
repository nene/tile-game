import { coordAdd, isCoordInRect, Rect, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { Character } from "../npc/Character";
import { PixelScreen } from "../PixelScreen";
import { Component } from "../ui/Component";
import { UI_HIGHLIGHT_COLOR } from "../ui/ui-utils";
import { Window } from "../ui/Window";

interface DialogConfig {
  character: Character;
  createContent: (rect: Rect) => Component,
  onClose?: () => void;
}

export class Dialog implements Component {
  private window: Window;
  private content: Component;
  private onClose?: () => void;
  private character: Character;

  constructor({ character, createContent, onClose }: DialogConfig) {
    this.onClose = onClose;
    this.character = character;
    this.window = new Window({
      headline: {
        title: character.getName() + ":",
        description: " ",
      },
      headlinePadding: 20,
      coord: [60, 91],
      size: [200, 109],
      onClose: onClose
    });
    this.content = createContent(rectGrow(this.window.contentAreaRect(), [-2, -2]));
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.drawAvatar(screen, { coord: coordAdd(this.window.getRect().coord, [2, 2]), size: [16, 16] });
    this.content.paint(screen)
  }

  private drawAvatar(screen: PixelScreen, rect: Rect) {
    screen.drawRect(rect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(this.character.getFaceSprite(), rect.coord);
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
