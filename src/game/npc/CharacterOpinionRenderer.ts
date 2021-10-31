import { coordAdd, Rect } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Character } from "./Character";

const ITEM_HIGHLIGHT_COLOR = "#cab59e";

export class CharacterOpinionRenderer {
  render(screen: PixelScreen, rect: Rect, item: Character, highlighted: boolean) {
    const iconRect: Rect = { coord: coordAdd(rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord = coordAdd(iconRect.coord, [18, -1]);

    screen.drawRect(rect, UI_BG_COLOR);
    screen.drawRect(iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(item.getFaceSprite(), iconRect.coord);
    screen.drawText(item.getName(), nameCoord, { color: "#000", shadowColor: UI_SHADOW_COLOR });

    if (highlighted) {
      this.strokeRect(screen, rect, ITEM_HIGHLIGHT_COLOR);
    }
  }

  private strokeRect(screen: PixelScreen, { coord, size }: Rect, color: string) {
    screen.drawRect({ coord, size: [size[0], 1] }, color);
    screen.drawRect({ coord, size: [1, size[1]] }, color);
    screen.drawRect({ coord: [coord[0] + size[0] - 1, coord[1]], size: [1, size[1]] }, color);
    screen.drawRect({ coord: [coord[0], coord[1] + size[1] - 1], size: [size[0], 1] }, color);
  }
}
