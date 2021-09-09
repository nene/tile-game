import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet, Sprite } from "./SpriteSheet";
import { GameObject } from "./types";
import { Coord, coordAdd } from "./Coord";

const max = Math.max;
const min = Math.min;

export class Player implements GameObject {
  public coord: Coord;
  private speed: Coord;
  private standRight: SpriteSheet;
  private standLeft: SpriteSheet;
  private walkRight: SpriteSheet;
  private walkLeft: SpriteSheet;
  private activeSpriteSheet: SpriteSheet;
  private sprite: Sprite;

  constructor(images: ImageLibrary) {
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
    this.speed = [3, this.speed[1]];
    this.decideSpriteSheet();
  }

  moveLeft() {
    this.speed = [-3, this.speed[1]];
    this.decideSpriteSheet();
  }

  moveUp() {
    this.speed = [this.speed[0], -3];
    this.decideSpriteSheet();
  }

  moveDown() {
    this.speed = [this.speed[0], 3];
    this.decideSpriteSheet();
  }

  stopRight() {
    const oldSpeed = this.speed;
    this.speed = [min(0, this.speed[0]), this.speed[1]];
    this.decideSpriteSheet(oldSpeed);
  }

  stopLeft() {
    const oldSpeed = this.speed;
    this.speed = [max(0, this.speed[0]), this.speed[1]];
    this.decideSpriteSheet(oldSpeed);
  }

  stopDown() {
    const oldSpeed = this.speed;
    this.speed = [this.speed[0], min(0, this.speed[1])];
    this.decideSpriteSheet(oldSpeed);
  }

  stopUp() {
    const oldSpeed = this.speed;
    this.speed = [this.speed[0], max(0, this.speed[1])];
    this.decideSpriteSheet(oldSpeed);
  }

  decideSpriteSheet(oldSpeed?: Coord) {
    if (this.speed[0] > 0 || this.speed[1] > 0) {
      this.activeSpriteSheet = this.walkRight;
    } else if (this.speed[0] < 0 || this.speed[1] < 0) {
      this.activeSpriteSheet = this.walkLeft;
    } else if (oldSpeed) {
      // when standing
      if (oldSpeed[0] > 0 || oldSpeed[1] > 0) {
        this.activeSpriteSheet = this.standRight;
      } else {
        this.activeSpriteSheet = this.standLeft;
      }
    }
  }

  tick(screen: PixelScreen) {
    this.coord = coordAdd(this.coord, this.speed);
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

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
  }
}
