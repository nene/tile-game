import { Coord } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet, Sprite } from "./SpriteSheet";
import { GameObject } from "./GameObject";

export class Grass implements GameObject {
  public coord: Coord;
  private spriteSheet: SpriteSheet;
  private sprite: Sprite;
  private even = false;

  constructor(images: ImageLibrary, screen: PixelScreen) {
    const img = images.get("grass" + (rand(4) + 1));
    this.spriteSheet = new SpriteSheet(img, [32, 32], 6);

    this.sprite = this.spriteSheet.getSprite(0);
    const spriteStartIndex = 2 + rand(6);
    for (let i = 0; i < spriteStartIndex; i++) {
      this.sprite = this.spriteSheet.getNextSprite();
    }

    this.coord = [
      rand(screen.width() + 32) - 32,
      rand(screen.height() + 32) - 32,
    ];
  }

  tick() {
    if (this.even) {
      this.sprite = this.spriteSheet.getNextSprite();
      this.even = false;
    } else {
      this.even = true;
    }
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
  }
}

function rand(n: number): number {
  return Math.floor(Math.random() * n);
}
