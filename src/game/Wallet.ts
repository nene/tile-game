import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";

export class Wallet {
  private bg: Sprite;

  constructor(private money: number) {
    this.bg = SpriteLibrary.get("wallet").getSprite([0, 0]);
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.bg, [267, 2], { fixed: true });
    screen.drawText(this.money, [306, 3], { align: "right", shadowColor: "#8f563b" });
  }
}
