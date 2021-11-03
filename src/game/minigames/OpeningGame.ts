import { Coord, coordAdd, coordDistance, coordDiv, coordMul, isCoordInRect, tileToScreenCoord } from "../Coord";
import { BeerBottle } from "../items/BeerBottle";
import { BottleOpener } from "../items/BottleOpener";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { MiniGame } from "./MiniGame";
import { GameEvent } from "../GameEvent";
import { Noise } from "../utils/Noise";
import { TextButton } from "../ui/TextButton";

enum CaptureStatus {
  miss = 0,
  hit = 1,
}

const NOISE_SCALE = 100;
const HAND_NOISE_SCALE = 10;

const BOTTLE_START_COORD: Coord = [100, 100];
const BOTTLE_MAX_MOVEMENT: Coord = [100, 100]; // +/- movement in each direction
const HAND_MAX_SHAKE = 40;

export class OpeningGame implements MiniGame {
  private bgSprite: Sprite;
  private bottleSprite: Sprite;
  private bottleCapSprites: SpriteSheet;
  private openerSprite: Sprite;
  private bottleCoord: Coord;
  private mouseCoord: Coord = [0, 0];
  private captureStatus = CaptureStatus.miss;
  private noise = new Noise();
  private handNoise = new Noise();
  private tickCounter = 0;
  private clicksAfterOpen = 0;
  private finishAtTick?: number;
  private handShakeAmount = 0;
  private abortButton: TextButton;

  constructor(private bottle: BeerBottle, private opener: BottleOpener) {
    this.bgSprite = SpriteLibrary.getSprite("opening-game-bg");
    this.bottleSprite = SpriteLibrary.getSprite("bottle-xl");
    this.bottleCapSprites = SpriteLibrary.get("bottle-cap-xl");
    this.openerSprite = SpriteLibrary.getSprite("bottle-opener-xl");
    this.bottleCoord = this.nextBottleCoord();
    this.abortButton = new TextButton({
      rect: { coord: [262, 184], size: [56, 14] },
      text: "Loobu",
      opaque: true,
      onClick: () => {
        this.finishAtTick = this.tickCounter;
      }
    });
  }

  setHandShakeAmount(amount: number) {
    this.handShakeAmount = amount;
  }

  tick() {
    this.bottleCoord = this.nextBottleCoord();
  }

  private nextBottleCoord(): Coord {
    this.tickCounter++;
    if (this.bottle.getDrink().capStrength === 0) {
      return BOTTLE_START_COORD;
    }
    const noiseCoord = this.noise.coord(this.tickCounter / this.getNoiseScale());
    const offset = coordMul(noiseCoord, BOTTLE_MAX_MOVEMENT).map(Math.floor) as Coord;
    return coordAdd(BOTTLE_START_COORD, offset);
  }

  private getNoiseScale(): number {
    const { capStrength } = this.bottle.getDrink();
    return NOISE_SCALE / capStrength;
  }

  paint(screen: PixelScreen) {
    this.drawBackground(screen);
    this.abortButton.paint(screen);

    screen.drawSprite(this.bottleSprite, this.bottleCoord);

    if (this.bottle.isOpen()) {
      // For open bottle, keep the cap inside opener
      screen.drawSprite(this.bottleCapSprites.getSprite([0, 0]), this.openerCoord());
    } else {
      // For closed bottle, keep the cap on the bottle
      screen.drawSprite(this.bottleCapSprites.getSprite([this.captureStatus, 0]), this.bottleCoord);
    }

    if (isCoordInRect(this.mouseCoord, this.abortButton.getRect())) {
      screen.drawSprite(SpriteLibrary.getSprite("cursor", [0, 0]), this.mouseCoord);
    } else {
      this.drawRibbon(screen);
      screen.drawSprite(this.openerSprite, this.openerCoord());
    }
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    if (this.abortButton.handleGameEvent(event)) {
      return true;
    }
    switch (event.type) {
      case "click": return this.handleClick();
      case "mousemove": this.handleMouseMove(event.coord); break;
      case "mousedown": this.handleMouseDown(event.coord); break;
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
    this.mouseCoord = coord;
    this.captureStatus = this.checkCaptureStatus();
  }

  private openerCoord(): Coord {
    return coordAdd(this.mouseCoord, this.handShake());
  }

  private handShake(): Coord {
    if (this.handShakeAmount === 0) {
      return [0, 0];
    }
    const shake = HAND_MAX_SHAKE * this.handShakeAmount;
    const scale = HAND_NOISE_SCALE / this.handShakeAmount;
    const x = this.handNoise.noise1D(this.tickCounter / scale);
    return coordMul([x, -x], [shake, shake]).map(Math.floor) as Coord;
  }

  private handleMouseDown(coord: Coord) {
    this.mouseCoord = coord;
    this.captureStatus = this.checkCaptureStatus();
    if (this.captureStatus === CaptureStatus.hit && !this.bottle.isOpen()) {
      this.finishAtTick = this.tickCounter + 50; // Wait max 5 seconds before closing the minigame screen
      this.bottle.open();
      SoundLibrary.play("opening-beer");
    }
  }

  isFinished(): boolean {
    return Boolean(this.finishAtTick && this.tickCounter > this.finishAtTick);
  }

  private checkCaptureStatus(): CaptureStatus {
    const distance = coordDistance(this.bottleCoord, this.openerCoord());
    return distance < this.opener.getCaptureDistance() ? CaptureStatus.hit : CaptureStatus.miss;
  }

  private drawBackground(screen: PixelScreen) {
    const [width, height] = coordDiv(screen.getSize(), [16, 16]);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(this.bgSprite, tileToScreenCoord([x, y]));
      }
    }
  }

  private drawRibbon(screen: PixelScreen) {
    if (this.opener.hasRibbon()) {
      const ctx = screen.getContext();
      ctx.strokeStyle = "#762323";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(...coordAdd(this.openerCoord(), [19, 19]));
      ctx.bezierCurveTo(180, 120, 320, 180, 300, 220);
      ctx.stroke();
    }
  }
}
