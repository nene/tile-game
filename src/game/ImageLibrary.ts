import { loadImage } from "./loadImage";
import cfeBg from "./sprites/cfe-bg.png";
import player from "./sprites/player.png";
import digRight from "./sprites/dig-right.png";
import snail from "./sprites/snail.png";
import snailKill from "./sprites/snail-kill.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images = {
      'cfe-bg': await loadImage(cfeBg),

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
