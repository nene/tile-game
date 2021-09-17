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
import walkLeft from "./sprites/player-left.png";
import walkRight from "./sprites/player-right.png";
import walkForward from "./sprites/player-forward.png";
import walkBack from "./sprites/player-back.png";
import digRight from "./sprites/dig-right.png";
import snail from "./sprites/snail.png";
import snailKill from "./sprites/snail-kill.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images = {
      'grass-bg': await loadImage(grassBg),

      'cabbage': await loadImage(cabbage),
      'wheat': await loadImage(wheat),
      'pepper': await loadImage(pepper),
      'marygold': await loadImage(marygold),

      'reed': await loadImage(reed),
      'water-lily': await loadImage(waterLily),

      'stones': await loadImage(stones),
      'water': await loadImage(water),

      'walk-left': await loadImage(walkLeft),
      'walk-right': await loadImage(walkRight),
      'walk-forward': await loadImage(walkForward),
      'walk-back': await loadImage(walkBack),

      'dig-right': await loadImage(digRight),

      'snail': await loadImage(snail),
      'snail-kill': await loadImage(snailKill),
    };
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
