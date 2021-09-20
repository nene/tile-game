import { loadImage } from "./loadImage";
import cfeBg from "./sprites/cfe-bg.png";
import cfeReb from "./sprites/cfe-reb.png";
import cfeKsv from "./sprites/cfe-ksv.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images = {
      'cfe-bg': await loadImage(cfeBg),

      'cfe-reb': await loadImage(cfeReb),

      'cfe-ksv': await loadImage(cfeKsv),
    };
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
