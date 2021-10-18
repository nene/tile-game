import { coordAdd, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { fitText } from "../ui/fitText";
import { UI_SHADOW_COLOR } from "../ui/ui-utils";
import { DialogContent } from "./DialogContent";

export class TextContent implements DialogContent {
  constructor(private text: string) { }

  paint(screen: PixelScreen, { coord, size }: Rect) {
    const style = { color: "#000", shadowColor: UI_SHADOW_COLOR };
    const lineHeight = 12;
    fitText(screen, size, this.text, style).forEach((line, i) => {
      screen.drawText(line, coordAdd(coord, [0, lineHeight * i]), style);
    });
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return undefined;
  }
}
