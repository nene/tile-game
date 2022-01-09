import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";

export class Lamp implements GameObject {
  private offAnimation: SpriteAnimation;
  private onAnimation: SpriteAnimation;

  constructor(private coord: Coord, private spriteName: SpriteName, private turnedOn: boolean = false) {
    const spriteSheet = SpriteLibrary.get(this.spriteName);
    this.offAnimation = new SpriteAnimation(spriteSheet, {
      frames: [[0, 0]],
    });
    this.onAnimation = new SpriteAnimation(spriteSheet, {
      frames: [[1, 0]],
    });
  }

  tick() {
    this.getAnimation().tick();
  }

  paint(screen: PixelScreen) {
    this.getAnimation().getSprites().forEach((sprite) => {
      screen.drawSprite(sprite, this.coord);
    });
  }

  private getAnimation() {
    return this.turnedOn ? this.onAnimation : this.offAnimation;
  }

  getCoord() {
    return this.coord;
  }

  zIndex() {
    return this.coord[1];
  }

  isSolid() {
    return false;
  }

  hitBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  isInteractable() {
    return false;
  }

  interact() { }

  toggle(turnedOn: boolean) {
    this.turnedOn = turnedOn;
  }
}
