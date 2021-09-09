import { Coord } from "./Coord";

export interface Sprite {
  image: HTMLImageElement,
  coord: Coord,
  size: Coord,
}

export class SpriteSheet {
  constructor(
    private image: HTMLImageElement,
    private size: Coord,
    private count: number
  ) {
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

  getCount(): number {
    return this.count;
  }
}
