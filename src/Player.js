import { SpriteSheet } from "./SpriteSheet";
import { Vector } from "./Vector";

export class Player {
  constructor(images) {
    this.coord = [0, 0];
    this.speed = [0, 0];

    this.standRight = new SpriteSheet(images.get("walkRight"), [32, 32], 1);
    this.standLeft = new SpriteSheet(images.get("walkLeft"), [32, 32], 1);
    this.walkRight = new SpriteSheet(images.get("walkRight"), [32, 32], 8);
    this.walkLeft = new SpriteSheet(images.get("walkLeft"), [32, 32], 8);

    this.activeSpriteSheet = this.standRight;
    this.sprite = this.activeSpriteSheet.getNextSprite();
  }

  moveRight() {
    this.speed = [3, 0];
    this.activeSpriteSheet = this.walkRight;
  }

  moveLeft() {
    this.speed = [-3, 0];
    this.activeSpriteSheet = this.walkLeft;
  }

  moveUp() {
    this.speed = [0, -3];
    this.activeSpriteSheet = this.walkLeft;
  }

  moveDown() {
    this.speed = [0, 3];
    this.activeSpriteSheet = this.walkRight;
  }

  stop() {
    if (this.speed[0] > 0 || this.speed[1] > 0) {
      this.activeSpriteSheet = this.standRight;
    }
    if (this.speed[0] < 0 || this.speed[1] < 0) {
      this.activeSpriteSheet = this.standLeft;
    }
    this.speed = [0, 0];
  }

  tick(screen) {
    this.coord = Vector.add(this.coord, this.speed);
    if (this.coord[0] > screen.width() - 32) {
      this.coord = [screen.width() - 32, this.coord[1]];
    }
    if (this.coord[0] < 0) {
      this.coord = [0, this.coord[1]];
    }
    if (this.coord[1] < 0) {
      this.coord = [this.coord[0], 0];
    }
    if (this.coord[1] > screen.height() - 32) {
      this.coord = [this.coord[0], screen.height() - 32];
    }
    this.sprite = this.activeSpriteSheet.getNextSprite();
  }

  paint(screen) {
    screen.drawSprite(this.sprite, this.coord);
  }
}
