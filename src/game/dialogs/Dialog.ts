import { Alignment, coordAdd, coordSub, isCoordInRect, Rect, rectAlign, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { ColorBandTouch } from "../items/ColorBandTouch";
import { AcademicCharacter, isAcademicCharacter } from "../npc/AcademicCharacter";
import { Character } from "../npc/Character";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Button } from "../ui/Button";
import { Component, isTickableComponent, TickableComponent } from "../ui/Component";
import { DecoratedFrame } from "../ui/DecoratedFrame";
import { SCREEN_RECT } from "../ui/screen-size";
import { drawInset, UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";
import { UiApi } from "../UiController";

interface DialogConfig {
  ui: UiApi;
  character: Character;
  createContent: (rect: Rect) => Component,
  onClose?: () => void;
  align?: Alignment;
}

const HEADLINE_HEIGHT = 20;

export class Dialog implements TickableComponent {
  private ui: UiApi;
  private content: Component;
  private onClose?: () => void;
  private character: Character;
  private iconRect: Rect;
  private iconHovered = false;
  private frame: DecoratedFrame;
  private rect: Rect;
  private closeButton?: Button;

  constructor({ ui, character, createContent, onClose, align }: DialogConfig) {
    this.ui = ui;
    this.onClose = onClose;
    this.character = character;
    this.rect = rectAlign({ coord: [0, 0], size: [208, 112] }, SCREEN_RECT, align || "bottom");
    this.content = createContent(rectGrow(this.contentAreaRect(), [-2, -2]));
    this.iconRect = { coord: coordAdd(this.rect.coord, [5, 5]), size: [16, 16] };
    this.frame = new DecoratedFrame(rectGrow(this.rect, [8, 8]));

    if (onClose) {
      this.closeButton = new Button({
        coord: coordAdd(this.rect.coord, [this.rect.size[0] - 13, 6]),
        spriteName: "close-button",
        unpressed: [0, 0],
        pressed: [1, 0],
        onClick: onClose,
      });
    }
  }

  private contentAreaRect(): Rect {
    const { coord, size } = rectGrow(this.rect, [-4, -4]);
    return { coord: coordAdd(coord, [0, HEADLINE_HEIGHT]), size: coordSub(size, [0, HEADLINE_HEIGHT]) };
  }

  tick() {
    if (isTickableComponent(this.content)) {
      this.content.tick();
    }
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    this.drawTitle(screen);
    this.drawIcon(screen);
    this.frame.paint(screen);
    this.closeButton?.paint(screen);
    this.content.paint(screen);
  }

  private drawBackground(screen: PixelScreen) {
    screen.drawRect(this.rect, UI_BG_COLOR);
    drawInset(screen, rectGrow(this.contentAreaRect(), [2, 1]));
  }

  private drawTitle(screen: PixelScreen) {
    const titleCoord = coordAdd(this.iconRect.coord, [this.iconRect.size[0] + 2, 4]);
    screen.drawText(this.character.getName(), titleCoord, { shadowColor: UI_SHADOW_COLOR });
  }

  private drawIcon(screen: PixelScreen) {
    if (this.iconHovered && isAcademicCharacter(this.character)) {
      this.drawColorBand(screen, this.character);
    } else {
      this.drawAvatar(screen);
    }
  }

  private drawColorBand(screen: PixelScreen, character: AcademicCharacter) {
    screen.drawSprite(SpriteLibrary.getSprite("color-band", [character.getColorBandState(), 0]), this.iconRect.coord);
  }

  private drawAvatar(screen: PixelScreen) {
    screen.drawRect(this.iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(this.character.getGraphics().getFaceSprite(), this.iconRect.coord);
  }

  getRect(): Rect {
    return this.rect;
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    if (this.closeButton?.handleGameEvent(event) || this.content.handleGameEvent(event)) {
      return true;
    }

    if (event.type === "mousemove" && isAcademicCharacter(this.character) && !this.ui.getAttributes().getSelectedItem()) {
      this.iconHovered = isCoordInRect(event.coord, this.iconRect);
      this.ui.highlightCursor(this.iconHovered);
      if (this.iconHovered) {
        return true;
      }
    }

    if (event.type === "click") {
      if (isCoordInRect(event.coord, this.iconRect)) {
        this.touchColorBand();
      }
      if (!isCoordInRect(event.coord, this.getRect())) {
        this.onClose && this.onClose();
      }
      return true;
    }

    return undefined;
  }

  private touchColorBand() {
    this.ui.getWorld().getActiveLocation().findCharacterFigure(this.character)?.interact(this.ui, new ColorBandTouch());
  }
}
