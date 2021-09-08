import { loadImage } from "./loadImage";
import grass1 from "./sprites/grass1.png";
import grass2 from "./sprites/grass2.png";
import grass3 from "./sprites/grass3.png";
import grass4 from "./sprites/grass4.png";

export class ImageLibrary {
  constructor() {
    this.images = {};
  }

  async load() {
    this.images.grass1 = await loadImage(grass1);
    this.images.grass2 = await loadImage(grass2);
    this.images.grass3 = await loadImage(grass3);
    this.images.grass4 = await loadImage(grass4);
  }

  get(name) {
    return this.images[name];
  }
}
