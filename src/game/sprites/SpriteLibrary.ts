import cfeWall from "./data/cfe-wall.png";
import cfeFloor from "./data/cfe-floor.png";
import cfeReb from "./data/cfe-reb.png";
import cfeKsv1 from "./data/cfe-ksv-1.png";
import cfeKsv2 from "./data/cfe-ksv-2.png";
import cfeKsv3 from "./data/cfe-ksv-3.png";
import callout from "./data/callout.png";
import table from "./data/table.png";
import fridge from "./data/fridge.png";
import beerCabinet from "./data/beer-cabinet.png";
import slot from "./data/slot.png";
import scrollBar from "./data/scroll-bar.png";
import cursor from "./data/cursor.png";
import wallet from "./data/wallet.png";
import gold from "./data/gold.png";
import beerGlassLg from "./data/beer-glass-lg.png";
import beerGlassSm from "./data/beer-glass-sm.png";
import bottle from "./data/bottle.png";
import bottleOpener from "./data/bottle-opener.png";
import openingGameBg from "./data/opening-game-bg.png";
import bottleXl from "./data/bottle-xl.png";
import bottleCapXl from "./data/bottle-cap-xl.png";
import bottleOpenerXl from "./data/bottle-opener-xl.png";
import pouringGameBg from "./data/pouring-game-bg.png";
import beerGlassXl from "./data/beer-glass-xl.png";
import beerXl from "./data/beer-xl.png";
import beerFoamXl from "./data/beer-foam-xl.png";

import { Coord } from "../Coord";
import { SpriteSheet, SpriteSheetConfig } from "./SpriteSheet";

const PLAYER_SIZE: Coord = [16, 32];
const PLAYER_OFFSET: Coord = [-8, -30];

// Helper to require values of `imageFiles` to conform to specific type
const spriteDef = (x: { src: string, cfg: SpriteSheetConfig }) => x;

const imageFiles = {
  'cfe-wall': spriteDef({ src: cfeWall, cfg: { size: [16, 48], colsRows: [1, 1] } }),
  'cfe-floor': spriteDef({ src: cfeFloor, cfg: { size: [16, 16], colsRows: [1, 1] } }),

  'cfe-reb': spriteDef({ src: cfeReb, cfg: { size: PLAYER_SIZE, colsRows: [4, 4], offset: PLAYER_OFFSET } }),

  'cfe-ksv-1': spriteDef({ src: cfeKsv1, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-2': spriteDef({ src: cfeKsv2, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-3': spriteDef({ src: cfeKsv3, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'callout': spriteDef({ src: callout, cfg: { size: [26, 14], colsRows: [1, 1], offset: [-10, -13] } }),

  'table': spriteDef({ src: table, cfg: { size: [64, 22], colsRows: [1, 1], offset: [0, -6] } }),
  'fridge': spriteDef({ src: fridge, cfg: { size: [16, 45], colsRows: [1, 1], offset: [0, -32] } }),
  'beer-cabinet': spriteDef({ src: beerCabinet, cfg: { size: [32, 45], colsRows: [1, 1], offset: [0, -32] } }),

  'slot': spriteDef({ src: slot, cfg: { size: [20, 20], colsRows: [2, 1] } }),
  'scroll-bar': spriteDef({ src: scrollBar, cfg: { size: [8, 8], colsRows: [5, 1] } }),
  'cursor': spriteDef({ src: cursor, cfg: { size: [16, 16], colsRows: [1, 1] } }),
  'wallet': spriteDef({ src: wallet, cfg: { size: [51, 12], colsRows: [1, 1] } }),
  'gold': spriteDef({ src: gold, cfg: { size: [8, 8], colsRows: [1, 1] } }),

  'beer-glass-lg': spriteDef({ src: beerGlassLg, cfg: { size: [16, 16], colsRows: [5, 1] } }),
  'beer-glass-sm': spriteDef({ src: beerGlassSm, cfg: { size: [10, 10], colsRows: [5, 1], offset: [-2, -17] } }),
  'bottle': spriteDef({ src: bottle, cfg: { size: [16, 16], colsRows: [3, 11] } }),
  'bottle-opener': spriteDef({ src: bottleOpener, cfg: { size: [16, 16], colsRows: [1, 1] } }),

  // bottle-opening game
  'opening-game-bg': spriteDef({ src: openingGameBg, cfg: { size: [16, 16], colsRows: [1, 1] } }),
  'bottle-xl': spriteDef({ src: bottleXl, cfg: { size: [109, 107], colsRows: [1, 1], offset: [-103, -101] } }),
  'bottle-cap-xl': spriteDef({ src: bottleCapXl, cfg: { size: [14, 14], colsRows: [2, 1], offset: [-6, -6] } }),
  'bottle-opener-xl': spriteDef({ src: bottleOpenerXl, cfg: { size: [32, 31], colsRows: [1, 1], offset: [-10, -10] } }),

  // beer-pouring game
  'pouring-game-bg': spriteDef({ src: pouringGameBg, cfg: { size: [16, 16], colsRows: [1, 1] } }),
  'beer-glass-xl': spriteDef({ src: beerGlassXl, cfg: { size: [76, 91], colsRows: [1, 1], offset: [-4, 0] } }),
  'beer-xl': spriteDef({ src: beerXl, cfg: { size: [47, 74], colsRows: [15, 1] } }),
  'beer-foam-xl': spriteDef({ src: beerFoamXl, cfg: { size: [47, 86], colsRows: [1, 1] } }),
};

export type SpriteName = keyof typeof imageFiles;

export class SpriteLibrary {
  private static sprites: Record<string, SpriteSheet> = {};

  public static async load() {
    for (const [name, { src, cfg }] of Object.entries(imageFiles)) {
      this.sprites[name] = new SpriteSheet(await this.loadImage(src), cfg);
    }
  }

  public static get(name: SpriteName): SpriteSheet {
    return this.sprites[name];
  }

  private static async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.src = src;
    });
  }
}