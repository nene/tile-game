import { coordAdd, Rect } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { ScoreChart } from "../ui/ScoreChart";
import { strokeRect, UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_MENU_ITEM_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Character } from "./Character";

export class CharacterOpinionRenderer {
  private scoreChart: ScoreChart;

  constructor() {
    this.scoreChart = new ScoreChart();
  }

  render(screen: PixelScreen, rect: Rect, character: Character, highlighted: boolean) {
    const iconRect: Rect = { coord: coordAdd(rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord = coordAdd(iconRect.coord, [18, -1]);
    const opinionCoord = coordAdd(nameCoord, [0, 10]);

    screen.drawRect(rect, UI_BG_COLOR);
    screen.drawRect(iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(character.getFaceSprite(), iconRect.coord);
    screen.drawText(character.getName(), nameCoord, { color: "#000", shadowColor: UI_SHADOW_COLOR });

    this.scoreChart.paint(screen, character.getOpinion(), opinionCoord);

    if (highlighted) {
      strokeRect(screen, rect, UI_MENU_ITEM_HIGHLIGHT_COLOR);
    }
  }
}
