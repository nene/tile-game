import { times } from "lodash";
import { Coord, coordAdd } from "./Coord";
import { Drunkenness } from "./Drunkenness";
import { DrinkColor } from "./items/Drink";
import { DrinkLevel } from "./items/BeerGlass";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./sprites/Sprite";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { SpriteSheet } from "./sprites/SpriteSheet";
import { Wallet } from "./Wallet";
import { Clock } from "./Clock";

export class ScoreBoard {
  private bg: Sprite;
  private beerGlass: SpriteSheet;

  constructor(private coord: Coord, private wallet: Wallet, private drunkenness: Drunkenness, private clock: Clock) {
    this.bg = SpriteLibrary.getSprite("scoreboard");
    this.beerGlass = SpriteLibrary.get("beer-glass-sm");
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.bg, this.coord);
    this.drawClock(screen);
    this.drawWallet(screen);
    this.drawAlcoholLevel(screen);
  }

  private drawClock(screen: PixelScreen) {
    screen.drawText(this.clock.getDisplayText(), coordAdd(this.coord, [4, 2]), { align: "left", shadowColor: "#8f563b" });
  }

  private drawWallet(screen: PixelScreen) {
    screen.drawText(this.wallet.getMoney(), coordAdd(this.coord, [39, 14]), { align: "right", shadowColor: "#8f563b" });
  }

  private drawAlcoholLevel(screen: PixelScreen) {
    times(5, (i: number) => {
      const level = this.getDrinkLevelForStep(4 - i);
      screen.drawSprite(this.beerGlass.getSprite([level, DrinkColor.light]), coordAdd(this.coord, [3 + i * 9, 24]));
    });
  }

  // alco level goes: 0...5
  // steps go: 0..4
  private getDrinkLevelForStep(levelStep: number): DrinkLevel {
    const diff = this.drunkenness.getLevel() - levelStep;
    if (diff >= 1) {
      return DrinkLevel.full;
    }
    if (diff >= 0.75) {
      return DrinkLevel.almostFull;
    }
    if (diff >= 0.5) {
      return DrinkLevel.half;
    }
    if (diff >= 0.25) {
      return DrinkLevel.almostEmpty;
    }
    else {
      return DrinkLevel.empty;
    }
  }
}
