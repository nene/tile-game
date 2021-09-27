import { Coord, coordAdd, coordDistance, coordDiv, coordMul, tileToScreenCoord } from "../Coord";
import { BeerBottle } from "../items/BeerBottle";
import { BottleOpener } from "../items/BottleOpener";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../SoundLibrary";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { MiniGame } from "./MiniGame";
import SimplexNoise from "simplex-noise";

enum CaptureStatus {
  miss = 0,
  hit = 1,
}

const NOISE_SCALE = 100;
const BOUNDING_BOX: Coord = [100, 100];

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
  private finishAtTick = 60 * 10; // Total amount of time for opening the bottle

  constructor(private bottle: BeerBottle, private opener: BottleOpener) {
    this.bgSprite = SpriteLibrary.get("opening-game-bg").getSprite([0, 0]);
    this.bottleSprite = SpriteLibrary.get("bottle-xl").getSprite([0, 0]);
    this.bottleCapSprites = SpriteLibrary.get("bottle-cap-xl");
    this.openerSprite = SpriteLibrary.get("bottle-opener-xl").getSprite([0, 0]);
    this.bottleCoord = [100, 100];
    this.openerCoord = [120, 120];
    this.noise = new SimplexNoise();
  }

  tick() {
    this.bottleCoord = coordAdd([100, 100], this.nextNoiseCoord());
  }

  private nextNoiseCoord(): Coord {
    this.tickCounter++;
    const x = this.noise.noise2D(this.tickCounter / NOISE_SCALE, 1);
    const y = this.noise.noise2D(1, this.tickCounter / NOISE_SCALE);
    return coordMul([x, y], BOUNDING_BOX).map(Math.floor) as Coord;
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    screen.drawSprite(this.bottleSprite, this.bottleCoord, { fixed: true });

    if (this.bottle.isOpen()) {
      // For open bottle, keep the cap inside opener
      screen.drawSprite(this.bottleCapSprites.getSprite([0, 0]), this.openerCoord, { fixed: true });
    } else {
      // For closed bottle, keep the cap on the bottle
      screen.drawSprite(this.bottleCapSprites.getSprite([this.captureStatus, 0]), this.bottleCoord, { fixed: true });
    }

    screen.drawSprite(this.openerSprite, this.openerCoord, { fixed: true });
  }

  handleClick(coord: Coord) {
    this.openerCoord = coord;
    this.captureStatus = this.checkCaptureStatus();
    if (this.captureStatus === CaptureStatus.hit && !this.bottle.isOpen()) {
      this.finishAtTick = this.tickCounter + 50; // Wait max 5 seconds before closing the minigame screen
      this.bottle.open();
      SoundLibrary.play("opening-beer");
    }
    else if (this.bottle.isOpen()) {
      // when already open, finish on the second click
      this.finishAtTick = this.tickCounter;
    }
  }

  handleMouseMove(coord: Coord) {
    this.openerCoord = coord;
    this.captureStatus = this.checkCaptureStatus();
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
        screen.drawSprite(this.bgSprite, tileToScreenCoord([x, y]), { fixed: true });
      }
    }
  }
}
