import { coordAdd, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { Component } from "../ui/Component";
import { fitText } from "../ui/fitText";
import { UI_SHADOW_COLOR } from "../ui/ui-utils";

export class TextContent implements Component {
  constructor(private text: string, private rect: Rect) { }

  paint(screen: PixelScreen) {
    const style = { color: "#000", shadowColor: UI_SHADOW_COLOR };
    const lineHeight = 12;
    fitText(screen, this.rect.size, this.text, style).forEach((line, i) => {
      screen.drawText(line, coordAdd(this.rect.coord, [0, lineHeight * i]), style);
    });
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return undefined;
  }
}
