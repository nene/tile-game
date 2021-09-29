import { Coord, coordAdd, coordDiv, coordSub, isCoordInRect, Rect, tileToScreenCoord } from "../Coord";
import { BeerBottle } from "../items/BeerBottle";
import { BeerGlass, BeerLevel } from "../items/BeerGlass";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../SoundLibrary";
import { Sprite } from "../Sprite";
import { SpriteAnimation } from "../SpriteAnimation";
import { SpriteLibrary } from "../SpriteLibrary";
import { MiniGame } from "./MiniGame";

const GLASS_COORD: Coord = [136, 98];
const MIN_LEVEL: Coord = [136, 176];
const MAX_LEVEL: Coord = [136, 90];
const POURING_AREA: Rect = { coord: [136, 0], size: [47, 98] };
const MAX_FLOW = 6;

export class PouringGame implements MiniGame {
  private bgSprite: Sprite;
  private tableSprite: Sprite;
  private bottleSprite: Sprite;
  private beerGlassSprite: Sprite;
  private beerAnimation: SpriteAnimation;
  private beerFoamSprite: Sprite;
  private bottleCoord: Coord;
  private pouring = false;
  private beerInBottle = 69;
  private beerInGlass = 0;
  private foamInGlass = 0;
  private clicksAfterFinished = 0;

  constructor(private glass: BeerGlass, private bottle: BeerBottle) {
    this.bgSprite = SpriteLibrary.get("pouring-game-bg").getSprite([0, 0]);
    this.tableSprite = SpriteLibrary.get("opening-game-bg").getSprite([0, 0]);
    this.bottleSprite = SpriteLibrary.get("bottle-xl").getSprite([0, 0]);
    this.beerGlassSprite = SpriteLibrary.get("beer-glass-xl").getSprite([0, 0]);
    this.beerAnimation = new SpriteAnimation(SpriteLibrary.get("beer-xl"), { frames: { from: [0, 0], to: [14, 0] } });
    this.beerFoamSprite = SpriteLibrary.get("beer-foam-xl").getSprite([0, 0]);
    this.bottleCoord = [0, 0];
  }

  tick() {
    this.beerAnimation.tick();
    if (this.isFlowing()) {
      this.beerInBottle = Math.max(0, this.beerInBottle - this.getFlowAmount());
      if (this.isPouringToGlass()) {
        this.beerInGlass = Math.min(100, this.beerInGlass + this.getFlowAmount());
        this.foamInGlass = Math.min(100 - this.beerInGlass, this.foamInGlass + (this.getFlowAmount() * this.getFlowAmount()) / 3);
      }
    }
    if (this.isFinished()) {
      this.bottle.empty();
      this.glass.fill(this.getBeerLevel());
    }
  }

  private isPouringToGlass(): boolean {
    return isCoordInRect(this.bottleCoord, POURING_AREA);
  }

  private getBeerLevel(): BeerLevel {
    if (this.beerInGlass > 52) {
      return BeerLevel.full;
    }
    if (this.beerInGlass > 35) {
      return BeerLevel.almostFull;
    }
    if (this.beerInGlass > 17) {
      return BeerLevel.half;
    }
    if (this.beerInGlass > 0) {
      return BeerLevel.almostEmpty;
    }
    return BeerLevel.empty;
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    if (this.isFlowing()) {
      screen.drawRect({ coord: coordAdd(this.bottleCoord, [-1, -1]), size: [this.getFlowAmount(), 200] }, "rgba(252,225,180,185)");
    }
    screen.drawSprite(this.bottleSprite, this.bottleCoord, { fixed: true });

    const beerY = this.beerInGlass / 100 * (MIN_LEVEL[1] - MAX_LEVEL[1]);
    const foamY = beerY + (this.foamInGlass / 100 * (MIN_LEVEL[1] - MAX_LEVEL[1]));
    screen.drawSprite(this.beerFoamSprite, coordSub(MIN_LEVEL, [0, foamY]), { fixed: true });

    screen.drawSprite(this.beerAnimation.getSprite(), coordSub(MIN_LEVEL, [0, beerY]), { fixed: true });

    this.drawTable(screen);
    screen.drawSprite(this.beerGlassSprite, GLASS_COORD, { fixed: true });

    screen.drawText("Pudelis õlut: " + Math.round(this.beerInBottle / 69 * 100) + "%", "#000", [200, 5]);
    screen.drawText("Shoppen täis: " + Math.round(this.beerInGlass + this.foamInGlass) + "%", "#000", [200 - 6, 16]);
  }

  handleClick(coord: Coord) {
    if (this.isGlassFull() || this.beerInBottle <= 0) {
      this.clicksAfterFinished++;
    }
  }

  handleMouseMove(coord: Coord) {
    this.bottleCoord = coord;
  }

  handleMouseDown() {
    this.pouring = true;
    if (this.isFlowing()) {
      SoundLibrary.play("pouring-beer");
    }
  }

  handleMouseUp() {
    this.pouring = false;
  }

  private isFlowing(): boolean {
    return this.pouring && this.beerInBottle > 0 && !this.isGlassFull();
  }

  private isGlassFull() {
    return this.beerInGlass + this.foamInGlass >= 100;
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
    return this.clicksAfterFinished >= 2;
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
