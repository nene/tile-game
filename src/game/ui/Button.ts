import { Coord, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";

interface ButtonConfig {
  coord: Coord;
  spriteName: SpriteName;
  unpressed: Coord;
  pressed: Coord;
  onClick: () => void;
}

export class Button {
  private rect: Rect;
  private pressed = false;
  private unpressedSprite: Sprite;
  private pressedSprite: Sprite;
  private onClick: () => void;

  constructor(cfg: ButtonConfig) {
    this.unpressedSprite = SpriteLibrary.getSprite(cfg.spriteName, cfg.unpressed);
    this.pressedSprite = SpriteLibrary.getSprite(cfg.spriteName, cfg.pressed);
    this.rect = { coord: cfg.coord, size: this.unpressedSprite.size };
    this.onClick = cfg.onClick;
  }

  handleGameEvent(event: GameEvent) {
    switch (event.type) {
      case "mousedown":
        if (isCoordInRect(event.coord, this.rect)) {
          this.pressed = true;
        }
        break;
      case "mouseup":
        this.pressed = false;
        break;
      case "click":
        if (isCoordInRect(event.coord, this.rect)) {
          this.onClick();
        }
        break;
    }
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.pressed ? this.pressedSprite : this.unpressedSprite, this.rect.coord);
  }
}
