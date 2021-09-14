import { loadImage } from "./loadImage";
import grassBg from "./sprites/grass-bg.png";
import cabbage from "./sprites/cabbage.png";
import wheat from "./sprites/wheat.png";
import pepper from "./sprites/pepper.png";
import marygold from "./sprites/marygold.png";
import reed from "./sprites/reed.png";
import waterLily from "./sprites/water-lily.png";
import stones from "./sprites/stones.png";
import water from "./sprites/water.png";
import walkLeft from "./sprites/walk-left.png";
import walkRight from "./sprites/walk-right.png";
import walkForward from "./sprites/walk-forward.png";
import walkBack from "./sprites/walk-back.png";
import digRight from "./sprites/dig-right.png";
import snail from "./sprites/snail.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images.grassBg = await loadImage(grassBg);

    this.images.cabbage = await loadImage(cabbage);
    this.images.wheat = await loadImage(wheat);
    this.images.pepper = await loadImage(pepper);
    this.images.marygold = await loadImage(marygold);

    this.images.reed = await loadImage(reed);
    this.images.waterLily = await loadImage(waterLily);

    this.images.stones = await loadImage(stones);
    this.images.water = await loadImage(water);

    this.images.walkLeft = await loadImage(walkLeft);
    this.images.walkRight = await loadImage(walkRight);
    this.images.walkForward = await loadImage(walkForward);
    this.images.walkBack = await loadImage(walkBack);

    this.images.digRight = await loadImage(digRight);

    this.images.snail = await loadImage(snail);
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
