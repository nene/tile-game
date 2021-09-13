import { loadImage } from "./loadImage";
import grassBg from "./sprites/grass-bg.png";
import grass1 from "./sprites/grass1.png";
import grass2 from "./sprites/grass2.png";
import grass3 from "./sprites/grass3.png";
import grass4 from "./sprites/grass4.png";
import grass13d from "./sprites/grass1-3d.png";
import stones from "./sprites/stones.png";
import water from "./sprites/water.png";
import walkLeft from "./sprites/walk-left.png";
import walkRight from "./sprites/walk-right.png";
import walkForward from "./sprites/walk-forward.png";
import walkBack from "./sprites/walk-back.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images.grassBg = await loadImage(grassBg);

    this.images.grass1 = await loadImage(grass1);
    this.images.grass2 = await loadImage(grass2);
    this.images.grass3 = await loadImage(grass3);
    this.images.grass4 = await loadImage(grass4);
    this.images.grass13d = await loadImage(grass13d);

    this.images.stones = await loadImage(stones);
    this.images.water = await loadImage(water);

    this.images.walkLeft = await loadImage(walkLeft);
    this.images.walkRight = await loadImage(walkRight);
    this.images.walkForward = await loadImage(walkForward);
    this.images.walkBack = await loadImage(walkBack);
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
