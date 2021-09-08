import { SpriteSheet } from "./SpriteSheet";

export class Grass {
  constructor(images, screen) {
    const img = images.get("grass" + (rand(4) + 1));
    this.spriteSheet = new SpriteSheet(img, [32, 32], 6);
    const spriteStartIndex = 2 + rand(6);
    for (let i = 0; i < spriteStartIndex; i++) {
      this.sprite = this.spriteSheet.getNextSprite();
    }
    this.coord = [rand(screen.width()), rand(screen.height())];
  }

  tick() {
    if (this.even) {
      this.sprite = this.spriteSheet.getNextSprite();
      this.even = false;
    } else {
      this.even = true;
    }
  }

  paint(screen) {
    screen.drawSprite(this.sprite, this.coord);
  }
}

function rand(n) {
  return Math.floor(Math.random() * n);
}
