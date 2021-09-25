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
import { SpriteSheet, SpriteSheetConfig } from "./SpriteSheet";
import { loadImage } from "./loadImage";

const PLAYER_SIZE: Coord = [16, 32];
const PLAYER_OFFSET: Coord = [-8, -30];

// Helper to require values of `imageFiles` to conform to specific type
const spriteDef = (x: { src: string, cfg: SpriteSheetConfig }) => x;

const imageFiles = {
  'cfe-bg': spriteDef({ src: cfeBg, cfg: { size: [16, 16], colsRows: [1, 4] } }),
  'cfe-wall': spriteDef({ src: cfeBg, cfg: { size: [16, 48], colsRows: [1, 1] } }),

  'cfe-reb': spriteDef({ src: cfeReb, cfg: { size: PLAYER_SIZE, colsRows: [4, 4], offset: PLAYER_OFFSET } }),

  'cfe-ksv': spriteDef({ src: cfeKsv, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-drinking': spriteDef({ src: cfeKsvDrinking, cfg: { size: PLAYER_SIZE, colsRows: [1, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-hand': spriteDef({ src: cfeKsvHand, cfg: { size: [7, 6], colsRows: [1, 1] } }),
  'callout': spriteDef({ src: callout, cfg: { size: [26, 14], colsRows: [1, 1], offset: [-10, -13] } }),

  'table': spriteDef({ src: table, cfg: { size: [64, 22], colsRows: [1, 1], offset: [0, -6] } }),
  'fridge': spriteDef({ src: fridge, cfg: { size: [16, 45], colsRows: [1, 1], offset: [0, -32] } }),
  'beer-cabinet': spriteDef({ src: beerCabinet, cfg: { size: [32, 45], colsRows: [1, 1], offset: [0, -32] } }),

  'slot': spriteDef({ src: slot, cfg: { size: [20, 20], colsRows: [2, 1] } }),
  'cursor': spriteDef({ src: cursor, cfg: { size: [16, 16], colsRows: [1, 1] } }),

  'beer-lg': spriteDef({ src: beerLg, cfg: { size: [16, 16], colsRows: [5, 1] } }),
  'beer-sm': spriteDef({ src: beerSm, cfg: { size: [10, 10], colsRows: [5, 1] } }),
  'bottle': spriteDef({ src: bottle, cfg: { size: [16, 16], colsRows: [3, 4] } }),
  'bottle-opener': spriteDef({ src: bottleOpener, cfg: { size: [16, 16], colsRows: [1, 1] } }),
};

type SpriteName = keyof typeof imageFiles;

export class SpriteLibrary {
  private static sprites: Record<string, SpriteSheet> = {};

  public static async load() {
    for (const [name, { src, cfg }] of Object.entries(imageFiles)) {
      this.sprites[name] = new SpriteSheet(await loadImage(src), cfg);
    }
  }

  public static get(name: SpriteName): SpriteSheet {
    return this.sprites[name];
  }
}
