import { Coord, coordAdd, coordConstrain, coordSub, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PatternLibrary } from "../PatternLibrary";
import { PixelScreen } from "../PixelScreen";
import { Button } from "./Button";
import { Component } from "./Component";
import { drawUpset, UI_BG_COLOR } from "./ui-utils";

const SPRITE_UP: Coord = [0, 0];
const SPRITE_UP_PRESSED: Coord = [1, 0];
const SPRITE_DOWN: Coord = [2, 0];
const SPRITE_DOWN_PRESSED: Coord = [3, 0];
const SPRITE_BG: Coord = [4, 0];

export class ScrollBar implements Component {
  private bgPattern: CanvasPattern;
  private buttons: Record<"up" | "down", Button>;
  private sliderPos = 0;
  private maxSliderPos: number;
  private sliderSize = 20;
  private sliderGrabbed?: Coord;

  constructor(private rect: Rect, private scrollArea: Rect) {
    this.buttons = {
      up: new Button({
        coord: rect.coord,
        spriteName: "scroll-bar",
        unpressed: SPRITE_UP,
        pressed: SPRITE_UP_PRESSED,
        onClick: () => {
          this.sliderPos = Math.max(0, this.sliderPos - 1);
        }
      }),
      down: new Button({
        coord: coordAdd(rect.coord, [0, rect.size[1] - 8]),
        spriteName: "scroll-bar",
        unpressed: SPRITE_DOWN,
        pressed: SPRITE_DOWN_PRESSED,
        onClick: () => {
          this.sliderPos = Math.min(this.maxSliderPos, this.sliderPos + 1);
        }
      }),
    }

    this.maxSliderPos = rect.size[1] - 16 - this.sliderSize;

    this.bgPattern = PatternLibrary.get("scroll-bar", SPRITE_BG);
  }

  handleGameEvent(event: GameEvent) {
    const stopPropagation =
      this.buttons.up.handleGameEvent(event) ||
      this.buttons.down.handleGameEvent(event);
    if (stopPropagation) {
      return true;
    }

    switch (event.type) {
      case "mousedown":
        if (isCoordInRect(event.coord, this.sliderRect())) {
          this.sliderGrabbed = coordSub(event.coord, [0, this.sliderPos]);
        }
        break;
      case "mouseup":
        this.sliderGrabbed = undefined;
        break;
      case "mousemove":
        if (this.sliderGrabbed) {
          this.sliderPos = coordConstrain(coordSub(event.coord, this.sliderGrabbed), { coord: [0, 0], size: [8, this.maxSliderPos] })[1];
        }
        break;
      case "wheel":
        if (isCoordInRect(event.coord, this.scrollArea)) {
          this.sliderPos = coordConstrain(coordAdd([0, this.sliderPos], event.wheelDelta), { coord: [0, 0], size: [8, this.maxSliderPos] })[1];
        }
        break;
    }
  }

  scrollPosition(): number {
    return this.sliderPos / this.maxSliderPos;
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    this.buttons.up.paint(screen);
    this.buttons.down.paint(screen);
    this.drawSlider(screen);
  }

  private drawBackground(screen: PixelScreen) {
    screen.drawRect(this.rect, this.bgPattern);
  }

  private drawSlider(screen: PixelScreen) {
    screen.drawRect(this.sliderRect(), UI_BG_COLOR);
    drawUpset(screen, this.sliderRect());
  }

  private sliderRect(): Rect {
    return { coord: coordAdd(this.rect.coord, [0, 8 + this.sliderPos]), size: [8, this.sliderSize] };
  }
}
