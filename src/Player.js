import walkRightPath from "./sprites/walk-right.png";
import walkLeftPath from "./sprites/walk-left.png";
import { SpriteSheet } from "./SpriteSheet";
import { loadImage } from "./loadImage";

export class Player {
  constructor() {
    this.coord = [0, 0];
    this.speed = 0;
  }

  async init() {
    this.stand = new SpriteSheet(await loadImage(walkRightPath), [32, 32], 1);
    this.walkRight = new SpriteSheet(
      await loadImage(walkRightPath),
      [32, 32],
      8
    );
    this.walkLeft = new SpriteSheet(await loadImage(walkLeftPath), [32, 32], 8);

    this.stop();
    this.sprite = this.activeSpriteSheet.getNextSprite();
  }

  moveRight() {
    this.speed = 3;
    this.activeSpriteSheet = this.walkRight;
  }

  moveLeft() {
    this.speed = -3;
    this.activeSpriteSheet = this.walkLeft;
  }

  stop() {
    this.speed = 0;
    this.activeSpriteSheet = this.stand;
  }

  tick(screen) {
    this.coord = [this.coord[0] + this.speed, this.coord[1]];
    if (this.coord[0] > screen.width() - 32) {
      this.stop();
    }
    if (this.coord[0] < 0) {
      this.stop();
    }
    this.sprite = this.activeSpriteSheet.getNextSprite();
  }

  paint(screen) {
    screen.drawSprite(this.sprite, this.coord);
  }
}
