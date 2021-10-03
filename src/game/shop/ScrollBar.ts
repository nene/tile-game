import { Coord, coordAdd, isCoordInRect, Rect } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { drawUpset, UI_BG_COLOR } from "../ui-utils";

const SPRITE_UP: Coord = [0, 0];
const SPRITE_UP_PRESSED: Coord = [1, 0];
const SPRITE_DOWN: Coord = [2, 0];
const SPRITE_DOWN_PRESSED: Coord = [3, 0];
const SPRITE_BG: Coord = [4, 0];

export class ScrollBar {
  private sprites: SpriteSheet;
  private buttonPressed = {
    "up": false,
    "down": false,
  };
  private buttonCoords: Record<"up" | "down", Rect>;

  constructor(private rect: Rect) {
    this.sprites = SpriteLibrary.get("scroll-bar");

    this.buttonCoords = {
      "up": { coord: rect.coord, size: [8, 8] },
      "down": { coord: coordAdd(rect.coord, [0, rect.size[1] - 8]), size: [8, 8] },
    };
  }

  handleMouseEvent(type: string, coord: Coord) {
    switch (type) {
      case "mousedown":
        this.buttonPressed.up = isCoordInRect(coord, this.buttonCoords.up);
        this.buttonPressed.down = isCoordInRect(coord, this.buttonCoords.down);
        break;
      case "mouseup":
        this.buttonPressed.up = false;
        this.buttonPressed.down = false;
        break;
    }
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    this.drawUpButton(screen);
    this.drawDownButton(screen);
    this.drawSlider(screen);
  }

  private drawBackground(screen: PixelScreen) {
    screen.drawRect(this.rect, this.sprites.getSprite(SPRITE_BG));
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
    const sliderRect: Rect = { coord: coordAdd(this.rect.coord, [0, 8]), size: [8, 20] };
    screen.drawRect(sliderRect, UI_BG_COLOR);
    drawUpset(screen, sliderRect);
  }
}
