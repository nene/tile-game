import walkRightPath from "./sprites/walk-right.png";
import walkLeftPath from "./sprites/walk-left.png";
import { SpriteSheet } from "./SpriteSheet";
import { loadImage } from "./loadImage";

export class Player {
  constructor() {
    this.coord = [0, 0];
    this.speed = 3;
  }

  async init() {
    this.walkRight = new SpriteSheet(
      await loadImage(walkRightPath),
      [32, 32],
      8
    );
    this.walkLeft = new SpriteSheet(await loadImage(walkLeftPath), [32, 32], 8);
    this.activeSpriteSheet = this.walkRight;
    this.sprite = this.activeSpriteSheet.getSprite(0);
  }

  tick(screen) {
    this.coord = [this.coord[0] + this.speed, this.coord[1]];
    if (this.coord[0] > screen.width() - 32) {
      this.activeSpriteSheet = this.walkLeft;
      this.speed = -3;
      this.coord = [this.coord[0] + this.speed, 0];
    }
    if (this.coord[0] < 0) {
      this.activeSpriteSheet = this.walkRight;
      this.speed = 3;
      this.coord = [this.coord[0] + this.speed, 0];
    }
    this.sprite = this.activeSpriteSheet.getNextSprite();
  }

  paint(screen) {
    screen.drawSprite(this.sprite, this.coord);
  }
}
