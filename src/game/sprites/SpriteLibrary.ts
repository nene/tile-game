import cfeBg from "./data/cfe-bg.png";
import cfeReb from "./data/cfe-reb.png";
import cfeRebDrunk from "./data/cfe-reb-drunk.png";
import cfeKsvSass from "./data/cfe-ksv-sass.png";
import cfeKsvKoppel from "./data/cfe-ksv-koppel.png";
import cfeKsvPikmets from "./data/cfe-ksv-pikmets.png";
import cfeKsvOtto from "./data/cfe-ksv-otto.png";
import cfeKsvKarl from "./data/cfe-ksv-karl.png";
import cfeKsvKark from "./data/cfe-ksv-kark.png";
import cfeBuilding from "./data/cfe-building.png";
import cfeBuildingDoor from "./data/cfe-building-door.png";
import cfeFence from "./data/cfe-fence.png";
import callout from "./data/callout.png";
import table from "./data/table.png";
import fridge from "./data/fridge.png";
import beerCabinet from "./data/beer-cabinet.png";
import beerBox from "./data/beer-box.png";
import bookCabinet from "./data/book-cabinet.png";
import kitchenSink from "./data/kitchen-sink.png";
import pianino from "./data/pianino.png";
import tap from "./data/tap.png";
import drain from "./data/drain.png";
import book from "./data/book.png";
import door from "./data/door.png";
import doorLarge from "./data/door-large.png";
import colorShield from "./data/color-shield.png";
import colorBand from "./data/color-band.png";
import bulletinBoard from "./data/bulletin-board.png";
import poloniaCartel from "./data/polonia-cartel.png";
import fireplace from "./data/fireplace.png";
import countertop from "./data/countertop.png";
import sofa from "./data/sofa.png";
import lamp from "./data/lamp.png";
import slot from "./data/slot.png";
import scrollBar from "./data/scroll-bar.png";
import closeButton from "./data/close-button.png";
import cursor from "./data/cursor.png";
import scoreboard from "./data/scoreboard.png";
import gold from "./data/gold.png";
import flagColors from "./data/flag-colors.png";
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
import opinionShield from "./data/opinion-shield.png";

import { Coord } from "../Coord";
import { SpriteSheet, SpriteSheetConfig } from "./SpriteSheet";

const PLAYER_SIZE: Coord = [16, 35];
const PLAYER_OFFSET: Coord = [-8, -30];

// Helper to require values of `imageFiles` to conform to specific type
const spriteDef = (x: { src: string, cfg: SpriteSheetConfig }) => x;

const imageFiles = {
  'cfe-bg': spriteDef({ src: cfeBg, cfg: { size: [16, 16], colsRows: [5, 4] } }),

  'cfe-reb': spriteDef({ src: cfeReb, cfg: { size: [16, 34], colsRows: [8, 5], offset: [-8, -31] } }),
  'cfe-reb-drunk': spriteDef({ src: cfeRebDrunk, cfg: { size: [32, 35], colsRows: [5, 2], offset: [-16, -30] } }),

  'cfe-ksv-sass': spriteDef({ src: cfeKsvSass, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-koppel': spriteDef({ src: cfeKsvKoppel, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-pikmets': spriteDef({ src: cfeKsvPikmets, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-otto': spriteDef({ src: cfeKsvOtto, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-karl': spriteDef({ src: cfeKsvKarl, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'cfe-ksv-kark': spriteDef({ src: cfeKsvKark, cfg: { size: PLAYER_SIZE, colsRows: [3, 1], offset: PLAYER_OFFSET } }),
  'callout': spriteDef({ src: callout, cfg: { size: [16, 18], colsRows: [3, 1], offset: [-5, -52] } }),

  // Furniture
  'table': spriteDef({ src: table, cfg: { size: [64, 23], offset: [0, -6] } }),
  'fridge': spriteDef({ src: fridge, cfg: { size: [16, 46], offset: [0, -32] } }),
  'beer-cabinet': spriteDef({ src: beerCabinet, cfg: { size: [32, 46], offset: [0, -32] } }),
  'beer-box': spriteDef({ src: beerBox, cfg: { size: [11, 14], offset: [3, -4] } }),
  'book-cabinet': spriteDef({ src: bookCabinet, cfg: { size: [16, 24], colsRows: [2, 1], offset: [0, -15] } }),
  'kitchen-sink': spriteDef({ src: kitchenSink, cfg: { size: [16, 43], offset: [0, -27] } }),
  'door': spriteDef({ src: door, cfg: { size: [20, 35], offset: [-2, -34] } }),
  'door-large': spriteDef({ src: doorLarge, cfg: { size: [33, 38], offset: [-1, -38] } }),
  'fireplace': spriteDef({ src: fireplace, cfg: { size: [64, 52], colsRows: [5, 1], offset: [0, -36] } }),
  'countertop': spriteDef({ src: countertop, cfg: { size: [16, 55], offset: [0, -23] } }),
  'sofa': spriteDef({ src: sofa, cfg: { size: [48, 26], offset: [0, -15] } }),
  'lamp': spriteDef({ src: lamp, cfg: { size: [21, 24], colsRows: [2, 1], offset: [-3, -44] } }),
  'pianino': spriteDef({ src: pianino, cfg: { size: [32, 27], offset: [0, -17] } }),
  // paintings
  'bulletin-board': spriteDef({ src: bulletinBoard, cfg: { size: [13, 17], offset: [4, -40] } }),
  'color-shield': spriteDef({ src: colorShield, cfg: { size: [11, 12], offset: [3, -40] } }),
  'polonia-cartel': spriteDef({ src: poloniaCartel, cfg: { size: [24, 29], offset: [1, -46] } }),

  // UI
  'slot': spriteDef({ src: slot, cfg: { size: [20, 20], colsRows: [2, 1] } }),
  'scroll-bar': spriteDef({ src: scrollBar, cfg: { size: [8, 8], colsRows: [5, 1] } }),
  'close-button': spriteDef({ src: closeButton, cfg: { size: [8, 8], colsRows: [2, 1] } }),
  'cursor': spriteDef({ src: cursor, cfg: { size: [8, 11], colsRows: [2, 1] } }),
  'scoreboard': spriteDef({ src: scoreboard, cfg: { size: [51, 36] } }),
  'gold': spriteDef({ src: gold, cfg: { size: [8, 8] } }),
  'flag-colors': spriteDef({ src: flagColors, cfg: { size: [12, 12], colsRows: [2, 1] } }),
  'opinion-shield': spriteDef({ src: opinionShield, cfg: { size: [6, 7], colsRows: [3, 1] } }),
  'color-band': spriteDef({ src: colorBand, cfg: { size: [16, 16], colsRows: [3, 1] } }),

  // Items
  'beer-glass-lg': spriteDef({ src: beerGlassLg, cfg: { size: [16, 16], colsRows: [5, 5] } }),
  'beer-glass-sm': spriteDef({ src: beerGlassSm, cfg: { size: [10, 10], colsRows: [5, 5] } }),
  'bottle': spriteDef({ src: bottle, cfg: { size: [16, 16], colsRows: [3, 12] } }),
  'bottle-opener': spriteDef({ src: bottleOpener, cfg: { size: [16, 16], colsRows: [2, 1] } }),
  'tap': spriteDef({ src: tap, cfg: { size: [16, 16] } }),
  'drain': spriteDef({ src: drain, cfg: { size: [16, 16] } }),
  'book': spriteDef({ src: book, cfg: { size: [16, 16] } }),

  // bottle-opening game
  'opening-game-bg': spriteDef({ src: openingGameBg, cfg: { size: [16, 16] } }),
  'bottle-xl': spriteDef({ src: bottleXl, cfg: { size: [109, 107], offset: [-103, -101] } }),
  'bottle-cap-xl': spriteDef({ src: bottleCapXl, cfg: { size: [14, 14], colsRows: [2, 1], offset: [-6, -6] } }),
  'bottle-opener-xl': spriteDef({ src: bottleOpenerXl, cfg: { size: [32, 31], offset: [-10, -10] } }),

  // beer-pouring game
  'cfe-bg-lg': spriteDef({ src: cfeBgLg, cfg: { size: [32, 32] } }),
  'beer-glass-xl': spriteDef({ src: beerGlassXl, cfg: { size: [76, 91], offset: [-4, 0] } }),
  'beer-xl': spriteDef({ src: beerXl, cfg: { size: [47, 74], colsRows: [15, 1] } }),
  'beer-foam-xl': spriteDef({ src: beerFoamXl, cfg: { size: [47, 86] } }),

  // Big building
  'cfe-building': spriteDef({ src: cfeBuilding, cfg: { size: [228, 171] } }),
  'cfe-building-door': spriteDef({ src: cfeBuildingDoor, cfg: { size: [23, 34], offset: [-2, -34] } }),
  'cfe-fence': spriteDef({ src: cfeFence, cfg: { size: [83, 37], offset: [-1, -31] } }),
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

  public static getSprite(name: SpriteName, coord?: Coord) {
    return this.get(name).getSprite(coord);
  }

  private static async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.src = src;
    });
  }
}
