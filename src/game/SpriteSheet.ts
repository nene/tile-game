import { Coord } from "./Coord";

export interface Sprite {
  image: HTMLImageElement,
  coord: Coord,
  size: Coord,
}

export class SpriteSheet {
  private index = 0;

  constructor(
    private image: HTMLImageElement,
    private size: Coord,
    private count: number
  ) {
  }

  getNextSprite(): Sprite {
    const sprite = this.getSprite(this.index);
    this.index = (this.index + 1) % this.count;
    return sprite;
  }

  getSprite(index: number): Sprite {
    return {
      image: this.image,
      coord: this.getSpriteCoord(index),
      size: this.size,
    };
  }

  getSpriteCoord(index: number): Coord {
    return [0, this.size[1] * index];
  }

  getSpriteWidth(): number {
    return this.size[0];
  }

  getSpriteHeight(): number {
    return this.size[1];
  }
}
