import { loadImage } from "./loadImage";
import cfeBg from "./sprites/cfe-bg.png";
import cfeReb from "./sprites/cfe-reb.png";
import digRight from "./sprites/dig-right.png";
import snail from "./sprites/snail.png";
import snailKill from "./sprites/snail-kill.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images = {
      'cfe-bg': await loadImage(cfeBg),

      'cfe-reb': await loadImage(cfeReb),
      'dig-right': await loadImage(digRight),

      'snail': await loadImage(snail),
      'snail-kill': await loadImage(snailKill),
    };
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
