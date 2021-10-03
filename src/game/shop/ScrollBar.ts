import { Coord, coordAdd, Rect } from "../Coord";
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

  constructor(private rect: Rect) {
    this.sprites = SpriteLibrary.get("scroll-bar");
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
    screen.drawSprite(this.sprites.getSprite(SPRITE_UP), this.rect.coord);
  }

  private drawDownButton(screen: PixelScreen) {
    screen.drawSprite(this.sprites.getSprite(SPRITE_DOWN), coordAdd(this.rect.coord, [0, this.rect.size[1] - 8]));
  }

  private drawSlider(screen: PixelScreen) {
    const sliderRect: Rect = { coord: coordAdd(this.rect.coord, [0, 8]), size: [8, 20] };
    screen.drawRect(sliderRect, UI_BG_COLOR);
    drawUpset(screen, sliderRect);
  }
}
