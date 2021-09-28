import { Coord, coordAdd, coordDiv, Rect, tileToScreenCoord } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { MiniGame } from "./MiniGame";

const GLASS_COORD: Coord = [136, 98];
const MAX_FLOW = 6;

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
  private flowing = false;

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
    if (this.flowing) {
      screen.drawRect({ coord: coordAdd(this.bottleCoord, [-1, -1]), size: [this.getFlowAmount(), 200] }, "rgba(252,225,180,185)");
    }
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

  handleMouseDown() {
    this.flowing = true;
  }

  handleMouseUp() {
    this.flowing = false;
  }

  private getFlowAmount(): number {
    const glassTop = GLASS_COORD[1];
    const bottleY = this.bottleCoord[1];
    const ceilingY = 32;
    if (bottleY >= glassTop) {
      return 1;
    }
    if (bottleY <= ceilingY) {
      return MAX_FLOW;
    }

    const range = glassTop - ceilingY;
    return Math.max(Math.floor(Math.abs(bottleY - glassTop) / range * MAX_FLOW), 1);
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
