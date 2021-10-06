import { Coord, coordAdd, coordDistance, coordDiv, coordMul, tileToScreenCoord } from "../Coord";
import { BeerBottle } from "../items/BeerBottle";
import { BottleOpener } from "../items/BottleOpener";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { MiniGame } from "./MiniGame";
import SimplexNoise from "simplex-noise";
import { GameEvent } from "../GameEvent";

enum CaptureStatus {
  miss = 0,
  hit = 1,
}

const NOISE_SCALE = 100;

const BOTTLE_START_COORD: Coord = [100, 100];
const BOTTLE_MAX_MOVEMENT: Coord = [100, 100]; // +/- movement in each direction

export class OpeningGame implements MiniGame {
  private bgSprite: Sprite;
  private bottleSprite: Sprite;
  private bottleCapSprites: SpriteSheet;
  private openerSprite: Sprite;
  private bottleCoord: Coord;
  private openerCoord: Coord;
  private captureStatus = CaptureStatus.miss;
  private captureThreshold = 5;
  private noise: SimplexNoise;
  private tickCounter = 0;
  private clicksAfterOpen = 0;
  private finishAtTick = 60 * 10; // Total amount of time for opening the bottle

  constructor(private bottle: BeerBottle, private opener: BottleOpener) {
    this.bgSprite = SpriteLibrary.get("opening-game-bg").getSprite([0, 0]);
    this.bottleSprite = SpriteLibrary.get("bottle-xl").getSprite([0, 0]);
    this.bottleCapSprites = SpriteLibrary.get("bottle-cap-xl");
    this.openerSprite = SpriteLibrary.get("bottle-opener-xl").getSprite([0, 0]);
    this.noise = new SimplexNoise();
    this.bottleCoord = this.nextBottleCoord();
    this.openerCoord = [0, 0];
  }

  tick() {
    this.bottleCoord = this.nextBottleCoord();
  }

  private nextBottleCoord(): Coord {
    this.tickCounter++;
    if (this.bottle.getBeer().capStrength === 0) {
      return BOTTLE_START_COORD;
    }
    const x = this.noise.noise2D(this.tickCounter / this.getNoiseScale(), 1);
    const y = this.noise.noise2D(1, this.tickCounter / this.getNoiseScale());
    const offset = coordMul([x, y], BOTTLE_MAX_MOVEMENT).map(Math.floor) as Coord;
    return coordAdd(BOTTLE_START_COORD, offset);
  }

  private getNoiseScale(): number {
    const { capStrength } = this.bottle.getBeer();
    return NOISE_SCALE / capStrength;
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    screen.drawSprite(this.bottleSprite, this.bottleCoord);

    if (this.bottle.isOpen()) {
      // For open bottle, keep the cap inside opener
      screen.drawSprite(this.bottleCapSprites.getSprite([0, 0]), this.openerCoord);
    } else {
      // For closed bottle, keep the cap on the bottle
      screen.drawSprite(this.bottleCapSprites.getSprite([this.captureStatus, 0]), this.bottleCoord);
    }

    screen.drawSprite(this.openerSprite, this.openerCoord);
  }

  handleGameEvent({ type, coord }: GameEvent): boolean | undefined {
    switch (type) {
      case "click": return this.handleClick();
      case "mousemove": this.handleMouseMove(coord); break;
      case "mousedown": this.handleMouseDown(coord); break;
    }
    return undefined;
  }

  private handleClick() {
    if (this.bottle.isOpen()) {
      this.clicksAfterOpen++;
      if (this.clicksAfterOpen === 2) {
        // when already open, finish on the second click
        this.finishAtTick = this.tickCounter;
      }
    }
    return true;
  }

  private handleMouseMove(coord: Coord) {
    this.openerCoord = coord;
    this.captureStatus = this.checkCaptureStatus();
  }

  private handleMouseDown(coord: Coord) {
    this.openerCoord = coord;
    this.captureStatus = this.checkCaptureStatus();
    if (this.captureStatus === CaptureStatus.hit && !this.bottle.isOpen()) {
      this.finishAtTick = this.tickCounter + 50; // Wait max 5 seconds before closing the minigame screen
      this.bottle.open();
      SoundLibrary.play("opening-beer");
    }
  }

  isFinished(): boolean {
    return this.tickCounter > this.finishAtTick;
  }

  private checkCaptureStatus(): CaptureStatus {
    const distance = coordDistance(this.bottleCoord, this.openerCoord);
    return distance < this.captureThreshold ? CaptureStatus.hit : CaptureStatus.miss;
  }

  private drawBackground(screen: PixelScreen) {
    const [width, height] = coordDiv(screen.getSize(), [16, 16]);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(this.bgSprite, tileToScreenCoord([x, y]));
      }
    }
  }
}
