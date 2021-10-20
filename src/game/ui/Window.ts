import { Coord, coordAdd, coordSub, Rect, rectCenter, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { drawInset, drawUpset, UI_BG_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Button } from "./Button";

interface WindowCfg {
  headline: Headline;
  coord?: Coord;
  size: Coord;
  onClose?: () => void;
}

export interface Headline {
  title: string;
  description?: string;
}

const TITLE_HEIGHT = 10;
const DESCRIPTION_HEIGHT = 7;

export class Window {
  private headline: Headline;
  private rect: Rect;
  private closeButton?: Button;

  constructor({ headline, coord, size, onClose }: WindowCfg) {
    this.headline = headline;
    this.rect = coord ? { coord, size } : rectCenter({ coord: [0, 0], size }, { coord: [0, 0], size: [320, 200] });
    if (onClose) {
      this.closeButton = new Button({
        coord: coordAdd(this.rect.coord, [this.rect.size[0] - 10, 2]),
        spriteName: "close-button",
        unpressed: [0, 0],
        pressed: [1, 0],
        onClick: onClose,
      });
    }
  }

  paint(screen: PixelScreen) {
    screen.drawRect(this.rect, UI_BG_COLOR);
    drawUpset(screen, this.rect);
    drawInset(screen, rectGrow(this.contentAreaRect(), [1, 1]));
    this.drawHeadline(screen);
    this.closeButton?.paint(screen);
  }

  getRect(): Rect {
    return this.rect;
  }

  private drawHeadline(screen: PixelScreen) {
    screen.drawText(this.headline.title, coordAdd(this.rect.coord, [3, 2]), { shadowColor: UI_SHADOW_COLOR });
    if (this.headline.description) {
      screen.drawText(this.headline.description, coordAdd(this.rect.coord, [3, 12]), { size: "small" });
    }
  }

  contentAreaRect(): Rect {
    const { coord, size } = rectGrow(this.rect, [-3, -3]);
    return { coord: coordAdd(coord, [0, this.headlineHeight()]), size: coordSub(size, [0, this.headlineHeight()]) };
  }

  headlineHeight(): number {
    return TITLE_HEIGHT + (this.headline.description ? DESCRIPTION_HEIGHT : 0);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return this.closeButton?.handleGameEvent(event);
  }
}

