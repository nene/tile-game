import { times } from "lodash";
import { Coord, coordAdd, coordMul } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";

enum ScoreShield {
  low = 0,
  high = 1,
  colored = 2,
}

export class ScoreChart {
  private shieldSprites: SpriteSheet;

  constructor() {
    this.shieldSprites = SpriteLibrary.get("opinion-shield");
  }

  paint(screen: PixelScreen, score: number, offset: Coord) {
    times(10, (i) => {
      const coord = coordAdd(offset, coordMul([7, 0], [i, i]));
      screen.drawSprite(this.shieldSprites.getSprite([this.scoreShield(i + 1, score), 0]), coord);
    });
  }

  private scoreShield(level: number, score: number): ScoreShield {
    if (score >= level) {
      return ScoreShield.colored;
    }
    return level < 6 ? ScoreShield.low : ScoreShield.high;
  }
}
