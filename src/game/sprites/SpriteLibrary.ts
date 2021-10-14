import cfeBg from "./data/cfe-bg.png";
import cfeReb from "./data/cfe-reb.png";
import cfeKsv1 from "./data/cfe-ksv-1.png";
import cfeKsv2 from "./data/cfe-ksv-2.png";
import cfeKsv3 from "./data/cfe-ksv-3.png";
import cfeBuilding from "./data/cfe-building.png";
import callout from "./data/callout.png";
import table from "./data/table.png";
import fridge from "./data/fridge.png";
import beerCabinet from "./data/beer-cabinet.png";
import beerBox from "./data/beer-box.png";
import door from "./data/door.png";
import colorShield from "./data/color-shield.png";
import bulletinBoard from "./data/bulletin-board.png";
import fireplace from "./data/fireplace.png";
import countertop from "./data/countertop.png";
import sofa from "./data/sofa.png";
import slot from "./data/slot.png";
import scrollBar from "./data/scroll-bar.png";
import cursor from "./data/cursor.png";
import scoreboard from "./data/scoreboard.png";
import gold from "./data/gold.png";
import beerGlassLg from "./data/beer-glass-lg.png";
import beerGlassSm from "./data/beer-glass-sm.png";
import bottle from "./data/bottle.png";
import bottleOpener from "./data/bottle-opener.png";
import openingGameBg from "./data/opening-game-bg.png";
import bottleXl from "./data/bottle-xl.png";
import bottleCapXl from "./data/bottle-cap-xl.png";
import bottleOpenerXl from "./data/bottle-opener-xl.png";
import cfeBgLg from "./data/cfe-bg-lg.png";
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
  'cfe-bg': spriteDef({ src: cfeBg, cfg: { size: [16, 16], colsRows: [4, 4] } }),

  'cfe-reb': spriteDef({ src: cfeReb, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),

  'cfe-ksv-1': spriteDef({ src: cfeKsv1, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-2': spriteDef({ src: cfeKsv2, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-3': spriteDef({ src: cfeKsv3, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'callout': spriteDef({ src: callout, cfg: { size: [26, 14], colsRows: [1, 1], offset: [-10, -13] } }),

  'table': spriteDef({ src: table, cfg: { size: [64, 23], colsRows: [1, 1], offset: [0, -6] } }),
  'fridge': spriteDef({ src: fridge, cfg: { size: [16, 46], colsRows: [1, 1], offset: [0, -32] } }),
  'beer-cabinet': spriteDef({ src: beerCabinet, cfg: { size: [32, 46], colsRows: [1, 1], offset: [0, -32] } }),
  'beer-box': spriteDef({ src: beerBox, cfg: { size: [11, 14], colsRows: [1, 1], offset: [3, -4] } }),
  'door': spriteDef({ src: door, cfg: { size: [20, 35], colsRows: [1, 1], offset: [-2, -34] } }),
  'color-shield': spriteDef({ src: colorShield, cfg: { size: [11, 12], colsRows: [1, 1], offset: [3, -40] } }),
  'bulletin-board': spriteDef({ src: bulletinBoard, cfg: { size: [13, 17], colsRows: [1, 1], offset: [4, -40] } }),
  'fireplace': spriteDef({ src: fireplace, cfg: { size: [64, 52], colsRows: [5, 1], offset: [0, -36] } }),
  'countertop': spriteDef({ src: countertop, cfg: { size: [16, 55], colsRows: [1, 1], offset: [0, -23] } }),
  'sofa': spriteDef({ src: sofa, cfg: { size: [48, 26], colsRows: [1, 1], offset: [0, -15] } }),

  'slot': spriteDef({ src: slot, cfg: { size: [20, 20], colsRows: [2, 1] } }),
  'scroll-bar': spriteDef({ src: scrollBar, cfg: { size: [8, 8], colsRows: [5, 1] } }),
  'cursor': spriteDef({ src: cursor, cfg: { size: [8, 11], colsRows: [2, 1] } }),
  'scoreboard': spriteDef({ src: scoreboard, cfg: { size: [51, 24], colsRows: [1, 1] } }),
  'gold': spriteDef({ src: gold, cfg: { size: [8, 8], colsRows: [1, 1] } }),

  'beer-glass-lg': spriteDef({ src: beerGlassLg, cfg: { size: [16, 16], colsRows: [5, 1] } }),
  'beer-glass-sm': spriteDef({ src: beerGlassSm, cfg: { size: [10, 10], colsRows: [5, 1], offset: [-2, -17] } }),
  'bottle': spriteDef({ src: bottle, cfg: { size: [16, 16], colsRows: [3, 11] } }),
  'bottle-opener': spriteDef({ src: bottleOpener, cfg: { size: [16, 16], colsRows: [2, 1] } }),

  // bottle-opening game
  'opening-game-bg': spriteDef({ src: openingGameBg, cfg: { size: [16, 16], colsRows: [1, 1] } }),
  'bottle-xl': spriteDef({ src: bottleXl, cfg: { size: [109, 107], colsRows: [1, 1], offset: [-103, -101] } }),
  'bottle-cap-xl': spriteDef({ src: bottleCapXl, cfg: { size: [14, 14], colsRows: [2, 1], offset: [-6, -6] } }),
  'bottle-opener-xl': spriteDef({ src: bottleOpenerXl, cfg: { size: [32, 31], colsRows: [1, 1], offset: [-10, -10] } }),

  // beer-pouring game
  'cfe-bg-lg': spriteDef({ src: cfeBgLg, cfg: { size: [32, 32], colsRows: [1, 1] } }),
  'beer-glass-xl': spriteDef({ src: beerGlassXl, cfg: { size: [76, 91], colsRows: [1, 1], offset: [-4, 0] } }),
  'beer-xl': spriteDef({ src: beerXl, cfg: { size: [47, 74], colsRows: [15, 1] } }),
  'beer-foam-xl': spriteDef({ src: beerFoamXl, cfg: { size: [47, 86], colsRows: [1, 1] } }),

  // Big building
  'cfe-building': spriteDef({ src: cfeBuilding, cfg: { size: [228, 171], colsRows: [1, 1] } }),
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
