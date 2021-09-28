import { Coord, coordAdd, coordDiv, Rect, tileToScreenCoord } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { MiniGame } from "./MiniGame";

const GLASS_COORD: Coord = [136, 98];

export class PouringGame implements MiniGame {
  private bgSprite: Sprite;
  private tableSprite: Sprite;
  private bottleSprite: Sprite;
  private beerGlassSprite: Sprite;
  private beerSprite: Sprite;
  private beerFoamSprite: Sprite;
  private bottleCoord: Coord;
  private beerCoord: Coord;
  private tickCounter = 0;

  constructor() {
    this.bgSprite = SpriteLibrary.get("pouring-game-bg").getSprite([0, 0]);
    this.tableSprite = SpriteLibrary.get("opening-game-bg").getSprite([0, 0]);
    this.bottleSprite = SpriteLibrary.get("bottle-xl").getSprite([0, 0]);
    this.beerGlassSprite = SpriteLibrary.get("beer-glass-xl").getSprite([0, 0]);
    this.beerSprite = SpriteLibrary.get("beer-xl").getSprite([0, 0]);
    this.beerFoamSprite = SpriteLibrary.get("beer-foam-xl").getSprite([0, 0]);
    this.bottleCoord = [0, 0];
    this.beerCoord = coordAdd(GLASS_COORD, [0, 19]);
  }

  tick() {
    this.tickCounter++;
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    screen.drawSprite(this.bottleSprite, this.bottleCoord, { fixed: true });
    screen.drawSprite(this.beerFoamSprite, GLASS_COORD, { fixed: true })
    screen.drawSprite(this.beerSprite, this.beerCoord, { fixed: true })
    this.drawTable(screen);
    screen.drawSprite(this.beerGlassSprite, GLASS_COORD, { fixed: true })
  }

  handleClick(coord: Coord) {
  }

  handleMouseMove(coord: Coord) {
    this.bottleCoord = coord;
  }

  isFinished(): boolean {
    return false;
  }

  private drawBackground(screen: PixelScreen) {
    this.fillWithTiles(screen, this.bgSprite, { coord: [0, 0], size: [screen.getSize()[0], 176] });
  }

  private drawTable(screen: PixelScreen) {
    this.fillWithTiles(screen, this.tableSprite, { coord: [0, 176], size: [screen.getSize()[0], 24] });
  }

  private fillWithTiles(screen: PixelScreen, sprite: Sprite, rect: Rect) {
    const [width, height] = coordDiv(rect.size, [16, 16]);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(sprite, coordAdd(rect.coord, tileToScreenCoord([x, y])), { fixed: true });
      }
    }
  }
}
