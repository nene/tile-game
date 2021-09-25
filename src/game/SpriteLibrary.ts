import cfeBg from "./sprites/cfe-bg.png";
import cfeReb from "./sprites/cfe-reb.png";
import cfeKsv from "./sprites/cfe-ksv.png";
import cfeKsvDrinking from "./sprites/cfe-ksv-drinking.png";
import cfeKsvHand from "./sprites/cfe-ksv-hand.png";
import callout from "./sprites/callout.png";
import table from "./sprites/table.png";
import fridge from "./sprites/fridge.png";
import beerCabinet from "./sprites/beer-cabinet.png";
import slot from "./sprites/slot.png";
import cursor from "./sprites/cursor.png";
import beerLg from "./sprites/beer-lg.png";
import beerSm from "./sprites/beer-sm.png";
import bottle from "./sprites/bottle.png";
import bottleOpener from "./sprites/bottle-opener.png";
import { Coord } from "./Coord";
import { SpriteSheet } from "./SpriteSheet";
import { loadImage } from "./loadImage";

const PLAYER_SIZE: Coord = [16, 32];
const PLAYER_OFFSET: Coord = [-8, -30];

export class SpriteLibrary {
  private static sprites: Record<string, SpriteSheet> = {};

  public static async load() {
    const cfeBgImage = await loadImage(cfeBg);

    this.sprites = {
      'cfe-bg': new SpriteSheet(cfeBgImage, { size: [16, 16], colsRows: [1, 4] }),
      'cfe-wall': new SpriteSheet(cfeBgImage, { size: [16, 48], colsRows: [1, 1] }),

      'cfe-reb': new SpriteSheet(await loadImage(cfeReb), { size: PLAYER_SIZE, colsRows: [4, 4], offset: PLAYER_OFFSET }),

      'cfe-ksv': new SpriteSheet(await loadImage(cfeKsv), { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET }),
      'cfe-ksv-drinking': new SpriteSheet(await loadImage(cfeKsvDrinking), { size: PLAYER_SIZE, colsRows: [1, 1], offset: PLAYER_OFFSET }),
      'cfe-ksv-hand': new SpriteSheet(await loadImage(cfeKsvHand), { size: [7, 6], colsRows: [1, 1] }),
      'callout': new SpriteSheet(await loadImage(callout), { size: [26, 14], colsRows: [1, 1], offset: [-10, -13] }),

      'table': new SpriteSheet(await loadImage(table), { size: [64, 22], colsRows: [1, 1], offset: [0, -6] }),
      'fridge': new SpriteSheet(await loadImage(fridge), { size: [16, 45], colsRows: [1, 1], offset: [0, -32] }),
      'beer-cabinet': new SpriteSheet(await loadImage(beerCabinet), { size: [32, 45], colsRows: [1, 1], offset: [0, -32] }),

      'slot': new SpriteSheet(await loadImage(slot), { size: [20, 20], colsRows: [2, 1] }),
      'cursor': new SpriteSheet(await loadImage(cursor), { size: [16, 16], colsRows: [1, 1] }),

      'beer-lg': new SpriteSheet(await loadImage(beerLg), { size: [16, 16], colsRows: [5, 1] }),
      'beer-sm': new SpriteSheet(await loadImage(beerSm), { size: [10, 10], colsRows: [5, 1] }),
      'bottle': new SpriteSheet(await loadImage(bottle), { size: [16, 16], colsRows: [3, 4] }),
      'bottle-opener': new SpriteSheet(await loadImage(bottleOpener), { size: [16, 16], colsRows: [1, 1] }),
    };
  }

  public static get(name: string): SpriteSheet {
    return this.sprites[name];
  }
}
