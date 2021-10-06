import SimplexNoise from "simplex-noise";
import { Coord, coordAdd, coordDiv, coordMul, coordSub, isCoordInRect, Rect, tileToScreenCoord } from "../Coord";
import { GameEvent } from "../GameEvent";
import { BeerBottle } from "../items/BeerBottle";
import { BeerGlass, BeerLevel } from "../items/BeerGlass";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { MiniGame } from "./MiniGame";
import { PouringLogic } from "./PouringLogic";

const GLASS_COORD: Coord = [136, 98];
const MIN_LEVEL: Coord = [136, 176];
const MAX_LEVEL: Coord = [136, 105];
const MAX_BEER_HEIGHT = MIN_LEVEL[1] - MAX_LEVEL[1];
const POURING_AREA: Rect = { coord: [136, 0], size: [47, 98] };
const DEBUG = false;

const NOISE_SCALE = 100;
const BOTTLE_MAX_MOVEMENT: Coord = [40, 25]; // +/- movement in each direction

export class PouringGame implements MiniGame {
  private sprites: Record<"bg" | "table" | "bottle" | "beerGlass" | "beerFoam", Sprite>;
  private beerAnimation: SpriteAnimation;

  private bottleCoord: Coord;
  private mouseDown = false;
  private clicksAfterFinished = 0;
  private pouring: PouringLogic;
  private tickCounter = 0;
  private noise: SimplexNoise;

  constructor(private glass: BeerGlass, private bottle: BeerBottle) {
    this.sprites = {
      bg: SpriteLibrary.get("pouring-game-bg").getSprite([0, 0]),
      table: SpriteLibrary.get("opening-game-bg").getSprite([0, 0]),
      bottle: SpriteLibrary.get("bottle-xl").getSprite([0, 0]),
      beerGlass: SpriteLibrary.get("beer-glass-xl").getSprite([0, 0]),
      beerFoam: SpriteLibrary.get("beer-foam-xl").getSprite([0, 0]),
    };

    this.beerAnimation = new SpriteAnimation(SpriteLibrary.get("beer-xl"), { frames: { from: [0, 0], to: [14, 0] } });
    this.bottleCoord = [0, 0];
    this.pouring = new PouringLogic(bottle.getBeer().foam);
    this.noise = new SimplexNoise();
  }

  tick() {
    this.tickCounter++;
    this.beerAnimation.tick();

    if (this.isFlowing()) {
      if (this.isPouringToGlass()) {
        this.pouring.pourToGlass(this.getFlowRate());
      } else {
        this.pouring.pourToGround(this.getFlowRate());
      }
    }
    if (this.isFinished()) {
      this.bottle.empty();
      this.glass.fill(this.getBeerLevel());
    }
  }

  private isPouringToGlass(): boolean {
    return isCoordInRect(this.adjustedBottleCoord(), POURING_AREA);
  }

  private getBeerLevel(): BeerLevel {
    if (this.pouring.getTotalInGlass() > 0.9) {
      return BeerLevel.full;
    }
    if (this.pouring.getTotalInGlass() > 0.75) {
      return BeerLevel.almostFull;
    }
    if (this.pouring.getTotalInGlass() > 0.5) {
      return BeerLevel.half;
    }
    if (this.pouring.getTotalInGlass() > 0.25) {
      return BeerLevel.almostEmpty;
    }
    return BeerLevel.empty;
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      this.drawBackground(screen);
      if (this.isFlowing()) {
        screen.drawRect({ coord: coordAdd(this.adjustedBottleCoord(), [-1, -1]), size: [Math.ceil(this.getFlowRate() * 6), 200] }, "rgba(252,225,180,185)");
      }
      screen.drawSprite(this.sprites.bottle, this.adjustedBottleCoord());

      const beerHeight = Math.floor(this.pouring.getLiquidInGlass() * MAX_BEER_HEIGHT);
      const foamHeight = Math.floor(this.pouring.getFoamInGlass() * MAX_BEER_HEIGHT);

      screen.drawSprite(this.sprites.beerFoam, coordSub(MIN_LEVEL, [0, foamHeight + beerHeight]));
      screen.drawSprite(this.beerAnimation.getSprite(), coordSub(MIN_LEVEL, [0, beerHeight]));

      this.drawTable(screen);
      screen.drawSprite(this.sprites.beerGlass, GLASS_COORD);

      screen.drawText("Pudelis veel: " + Math.round(this.pouring.getLiquidInBottle() * 100) + "%", [200, 5]);
      screen.drawText("Shoppen täis: " + Math.round(this.pouring.getFillLevel() * 100) + "%", [200 - 6, 16]);
      if (DEBUG) {
        screen.drawText("Vaht: " + Math.round(this.pouring.getFoamInGlass() * 100) + "%", [200 - 6, 26]);
        screen.drawText("Vedelik: " + Math.round(this.pouring.getLiquidInGlass() * 100) + "%", [200 - 6, 36]);
        screen.drawText("Flow: " + Math.round(this.getFlowRate() * 100) + "%", [200 - 6, 46]);
      }
    });
  }

  private adjustedBottleCoord() {
    return coordAdd(this.bottleCoord, this.bottleOffset());
  }

  private bottleOffset(): Coord {
    const x = this.noise.noise2D(this.tickCounter / NOISE_SCALE, 1);
    const y = this.noise.noise2D(1, this.tickCounter / NOISE_SCALE);
    return coordMul([x, y], BOTTLE_MAX_MOVEMENT).map(Math.floor) as Coord;
  }

  handleGameEvent({ type, coord }: GameEvent): boolean | undefined {
    switch (type) {
      case "click": return this.handleClick();
      case "mousemove": this.bottleCoord = coord; break;
      case "mousedown": this.handleMouseDown(); break;
      case "mouseup": this.mouseDown = false; break;
    }
    return undefined;
  }

  private handleClick() {
    if (this.pouring.isFinished()) {
      this.clicksAfterFinished++;
    }
    return true;
  }

  private handleMouseDown() {
    this.mouseDown = true;
    if (this.isFlowing()) {
      SoundLibrary.play("pouring-beer");
    }
  }

  private isFlowing(): boolean {
    return this.mouseDown && !this.pouring.isFinished();
  }

  private getFlowRate(): number {
    const glassTop = GLASS_COORD[1] - 8;
    const bottleY = this.adjustedBottleCoord()[1];
    const ceilingY = 32;
    if (bottleY >= glassTop) {
      return 0.01;
    }
    if (bottleY <= ceilingY) {
      return 1;
    }

    const range = glassTop - ceilingY;
    const bottlePos = bottleY - ceilingY;
    return Math.max(0.01, 1 - bottlePos / range);
  }

  isFinished(): boolean {
    return this.clicksAfterFinished >= 2;
  }

  private drawBackground(screen: PixelScreen) {
    this.fillWithTiles(screen, this.sprites.bg, { coord: [0, 0], size: [screen.getSize()[0], 176] });
  }

  private drawTable(screen: PixelScreen) {
    this.fillWithTiles(screen, this.sprites.table, { coord: [0, 176], size: [screen.getSize()[0], 24] });
  }

  private fillWithTiles(screen: PixelScreen, sprite: Sprite, rect: Rect) {
    const [width, height] = coordDiv(rect.size, [16, 16]);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(sprite, coordAdd(rect.coord, tileToScreenCoord([x, y])));
      }
    }
  }
}
