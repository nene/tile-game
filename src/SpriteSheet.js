export class SpriteSheet {
  constructor(image, [width, height], count) {
    this.image = image;
    this.size = [width, height];
    this.count = count;
    this.index = 0;
  }

  getNextSprite() {
    const sprite = this.getSprite(this.index);
    this.index = (this.index + 1) % this.count;
    return sprite;
  }

  getRandomSprite() {
    return this.getSprite(Math.floor(Math.random() * this.count));
  }

  getSprite(index) {
    return {
      image: this.image,
      coord: this.getSpriteCoord(index),
      size: this.size,
    };
  }

  getSpriteCoord(index) {
    return [0, this.size[1] * index];
  }

  getSpriteWidth() {
    return this.size[0];
  }

  getSpriteHeight() {
    return this.size[1];
  }
}
