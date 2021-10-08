import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./sprites/Sprite";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { Wallet } from "./Wallet";

export class ScoreBoard {
  private bg: Sprite;

  constructor(private wallet: Wallet) {
    this.bg = SpriteLibrary.get("scoreboard").getSprite([0, 0]);
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.bg, [267, 2]);
    screen.drawText(this.wallet.getMoney(), [306, 3], { align: "right", shadowColor: "#8f563b" });
  }
}
