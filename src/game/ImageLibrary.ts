import { loadImage } from "./loadImage";
import cfeBg from "./sprites/cfe-bg.png";
import cfeReb from "./sprites/cfe-reb.png";
import cfeKsv from "./sprites/cfe-ksv.png";
import table from "./sprites/table.png";

export class ImageLibrary {
  private images: Record<string, HTMLImageElement> = {};

  async load() {
    this.images = {
      'cfe-bg': await loadImage(cfeBg),

      'cfe-reb': await loadImage(cfeReb),

      'cfe-ksv': await loadImage(cfeKsv),

      'table': await loadImage(table),
    };
  }

  get(name: string): HTMLImageElement {
    return this.images[name];
  }
}
