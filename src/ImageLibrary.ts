import { loadImage } from "./loadImage";
import grassBg from "./sprites/grass-bg.png";
import grass1 from "./sprites/grass1.png";
import grass2 from "./sprites/grass2.png";
import grass3 from "./sprites/grass3.png";
import grass4 from "./sprites/grass4.png";
import walkLeft from "./sprites/walk-left.png";
import walkRight from "./sprites/walk-right.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images.grassBg = await loadImage(grassBg);

    this.images.grass1 = await loadImage(grass1);
    this.images.grass2 = await loadImage(grass2);
    this.images.grass3 = await loadImage(grass3);
    this.images.grass4 = await loadImage(grass4);

    this.images.walkLeft = await loadImage(walkLeft);
    this.images.walkRight = await loadImage(walkRight);
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
