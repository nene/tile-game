import cfeBg from "./sprites/cfe-bg.png";
import cfeReb from "./sprites/cfe-reb.png";
import cfeKsv from "./sprites/cfe-ksv.png";
import table from "./sprites/table.png";
import fridge from "./sprites/fridge.png";
import beerCabinet from "./sprites/beer-cabinet.png";
import { Coord } from "./Coord";
import { SpriteSheet } from "./SpriteSheet";
import { loadImage } from "./loadImage";

const PLAYER_SIZE: Coord = [16, 32];
const PLAYER_OFFSET: Coord = [-8, -30];

export class SpriteLibrary {
  private sprites: Record<string, SpriteSheet> = {};

  async load() {
    const cfeBgImage = await loadImage(cfeBg);

    this.sprites = {
      'cfe-bg': new SpriteSheet(cfeBgImage, { size: [16, 16], colsRows: [1, 4] }),
      'cfe-wall': new SpriteSheet(cfeBgImage, { size: [16, 48], colsRows: [1, 1] }),

      'cfe-reb': new SpriteSheet(await loadImage(cfeReb), { size: PLAYER_SIZE, colsRows: [4, 4], offset: PLAYER_OFFSET }),

      'cfe-ksv': new SpriteSheet(await loadImage(cfeKsv), { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET }),

      'table': new SpriteSheet(await loadImage(table), { size: [64, 22], colsRows: [1, 1], offset: [0, -6] }),
      'fridge': new SpriteSheet(await loadImage(fridge), { size: [16, 45], colsRows: [1, 1], offset: [0, -32] }),
      'beer-cabinet': new SpriteSheet(await loadImage(beerCabinet), { size: [32, 45], colsRows: [1, 1], offset: [0, -32] }),
    };
  }

  get(name: string): SpriteSheet {
    return this.sprites[name];
  }
}
