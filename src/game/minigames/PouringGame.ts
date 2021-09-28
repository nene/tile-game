import { Coord, coordAdd, coordDiv, coordSub, Rect, tileToScreenCoord } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { MiniGame } from "./MiniGame";

const GLASS_COORD: Coord = [136, 98];
const BEER_MIN_LEVEL: Coord = [136, 176];
const BEER_MAX_LEVEL: Coord = [136, 117];
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
  private pouring = false;
  private beerInBottle = 100;
  private beerInGlass = 0;

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
    if (this.isFlowing()) {
      this.beerInBottle -= this.getFlowAmount();
      this.beerInGlass = Math.min(100, this.beerInGlass + this.getFlowAmount());
    }
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    if (this.isFlowing()) {
      screen.drawRect({ coord: coordAdd(this.bottleCoord, [-1, -1]), size: [this.getFlowAmount(), 200] }, "rgba(252,225,180,185)");
    }
    screen.drawSprite(this.bottleSprite, this.bottleCoord, { fixed: true });

    //screen.drawSprite(this.beerFoamSprite, GLASS_COORD, { fixed: true });
    const beerY = this.beerInGlass / 100 * (BEER_MIN_LEVEL[1] - BEER_MAX_LEVEL[1])
    screen.drawSprite(this.beerSprite, coordSub(BEER_MIN_LEVEL, [0, beerY]), { fixed: true });

    this.drawTable(screen);
    screen.drawSprite(this.beerGlassSprite, GLASS_COORD, { fixed: true });
  }

  handleClick(coord: Coord) {
  }

  handleMouseMove(coord: Coord) {
    this.bottleCoord = coord;
  }

  handleMouseDown() {
    this.pouring = true;
  }

  handleMouseUp() {
    this.pouring = false;
  }

  private isFlowing(): boolean {
    return this.pouring && this.beerInBottle > 0;
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
