import { loadImage } from "./loadImage";
import cfeBg from "./sprites/cfe-bg.png";
import cabbage from "./sprites/cabbage.png";
import wheat from "./sprites/wheat.png";
import pepper from "./sprites/pepper.png";
import marygold from "./sprites/marygold.png";
import reed from "./sprites/reed.png";
import waterLily from "./sprites/water-lily.png";
import stones from "./sprites/stones.png";
import water from "./sprites/water.png";
import player from "./sprites/player.png";
import digRight from "./sprites/dig-right.png";
import snail from "./sprites/snail.png";
import snailKill from "./sprites/snail-kill.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images = {
      'cfe-bg': await loadImage(cfeBg),

      'cabbage': await loadImage(cabbage),
      'wheat': await loadImage(wheat),
      'pepper': await loadImage(pepper),
      'marygold': await loadImage(marygold),

      'reed': await loadImage(reed),
      'water-lily': await loadImage(waterLily),

      'stones': await loadImage(stones),
      'water': await loadImage(water),

      'player': await loadImage(player),
      'dig-right': await loadImage(digRight),

      'snail': await loadImage(snail),
      'snail-kill': await loadImage(snailKill),
    };
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
