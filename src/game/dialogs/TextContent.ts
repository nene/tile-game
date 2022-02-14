import { coordAdd, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { TickableComponent } from "../ui/Component";
import { fitText } from "../ui/fitText";
import { UI_SHADOW_COLOR } from "../ui/ui-utils";
import { constrain } from "../utils/constrain";

interface TextContentConfig {
  text: string;
  rect: Rect;
  animated?: boolean;
}

export class TextContent implements TickableComponent {
  private text: string;
  private rect: Rect;
  private visibleTextLength: number;

  constructor({ text, rect, animated }: TextContentConfig) {
    this.text = text;
    this.rect = rect;
    this.visibleTextLength = animated ? 0 : text.length;
  }

  tick() {
    this.visibleTextLength = constrain(this.visibleTextLength + 4, { min: 0, max: this.text.length });
  }

  paint(screen: PixelScreen) {
    const style = { color: "#000", shadowColor: UI_SHADOW_COLOR };
    const lineHeight = 12;
    fitText(screen, this.rect.size, this.getVisibleText(), style).forEach((line, i) => {
      screen.drawText(line, coordAdd(this.rect.coord, [0, lineHeight * i]), style);
    });
  }

  private getVisibleText(): string {
    return this.text.slice(0, this.visibleTextLength);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return undefined;
  }

  isAnimationFinished(): boolean {
    return this.visibleTextLength === this.text.length;
  }
}
