import cfeBg from "./sprites/cfe-bg.png";
import cfeReb from "./sprites/cfe-reb.png";
import cfeKsv from "./sprites/cfe-ksv.png";
import callout from "./sprites/callout.png";
import table from "./sprites/table.png";
import fridge from "./sprites/fridge.png";
import beerCabinet from "./sprites/beer-cabinet.png";
import slot from "./sprites/slot.png";
import beerLg from "./sprites/beer-lg.png";
import bottle from "./sprites/bottle.png";
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
      'callout': new SpriteSheet(await loadImage(callout), { size: [26, 14], colsRows: [1, 1], offset: [-10, -13] }),

      'table': new SpriteSheet(await loadImage(table), { size: [64, 22], colsRows: [1, 1], offset: [0, -6] }),
      'fridge': new SpriteSheet(await loadImage(fridge), { size: [16, 45], colsRows: [1, 1], offset: [0, -32] }),
      'beer-cabinet': new SpriteSheet(await loadImage(beerCabinet), { size: [32, 45], colsRows: [1, 1], offset: [0, -32] }),

      'slot': new SpriteSheet(await loadImage(slot), { size: [20, 20], colsRows: [2, 1] }),

      'beer-lg': new SpriteSheet(await loadImage(beerLg), { size: [16, 16], colsRows: [5, 1] }),
      'bottle': new SpriteSheet(await loadImage(bottle), { size: [16, 16], colsRows: [2, 3] }),
    };
  }

  get(name: string): SpriteSheet {
    return this.sprites[name];
  }
}
