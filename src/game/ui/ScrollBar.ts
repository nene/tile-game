import { Coord, coordAdd, coordConstrain, coordSub, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PatternLibrary } from "../PatternLibrary";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { drawUpset, UI_BG_COLOR } from "./ui-utils";

const SPRITE_UP: Coord = [0, 0];
const SPRITE_UP_PRESSED: Coord = [1, 0];
const SPRITE_DOWN: Coord = [2, 0];
const SPRITE_DOWN_PRESSED: Coord = [3, 0];
const SPRITE_BG: Coord = [4, 0];

export class ScrollBar {
  private sprites: SpriteSheet;
  private bgPattern: CanvasPattern;
  private buttonPressed = {
    "up": false,
    "down": false,
  };
  private buttonCoords: Record<"up" | "down", Rect>;
  private sliderPos = 0;
  private maxSliderPos: number;
  private sliderSize = 20;
  private sliderGrabbed?: Coord;

  constructor(private rect: Rect, private scrollArea: Rect) {
    this.sprites = SpriteLibrary.get("scroll-bar");

    this.buttonCoords = {
      "up": { coord: rect.coord, size: [8, 8] },
      "down": { coord: coordAdd(rect.coord, [0, rect.size[1] - 8]), size: [8, 8] },
    };

    this.maxSliderPos = rect.size[1] - 16 - this.sliderSize;

    this.bgPattern = PatternLibrary.get("scroll-bar", SPRITE_BG);
  }

  handleGameEvent(event: GameEvent) {
    switch (event.type) {
      case "mousedown":
        if (isCoordInRect(event.coord, this.buttonCoords.up)) {
          this.buttonPressed.up = true;
          this.sliderPos = Math.max(0, this.sliderPos - 1);
        }
        else if (isCoordInRect(event.coord, this.buttonCoords.down)) {
          this.buttonPressed.down = true;
          this.sliderPos = Math.min(this.maxSliderPos, this.sliderPos + 1);
        }
        else if (isCoordInRect(event.coord, this.sliderRect())) {
          this.sliderGrabbed = coordSub(event.coord, [0, this.sliderPos]);
        }
        break;
      case "mouseup":
        this.buttonPressed.up = false;
        this.buttonPressed.down = false;
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
    this.drawUpButton(screen);
    this.drawDownButton(screen);
    this.drawSlider(screen);
  }

  private drawBackground(screen: PixelScreen) {
    screen.drawRect(this.rect, this.bgPattern);
  }

  private drawUpButton(screen: PixelScreen) {
    const state = this.buttonPressed.up ? SPRITE_UP_PRESSED : SPRITE_UP;
    screen.drawSprite(this.sprites.getSprite(state), this.buttonCoords.up.coord);
  }

  private drawDownButton(screen: PixelScreen) {
    const state = this.buttonPressed.down ? SPRITE_DOWN_PRESSED : SPRITE_DOWN;
    screen.drawSprite(this.sprites.getSprite(state), this.buttonCoords.down.coord);
  }

  private drawSlider(screen: PixelScreen) {
    screen.drawRect(this.sliderRect(), UI_BG_COLOR);
    drawUpset(screen, this.sliderRect());
  }

  private sliderRect(): Rect {
    return { coord: coordAdd(this.rect.coord, [0, 8 + this.sliderPos]), size: [8, this.sliderSize] };
  }
}