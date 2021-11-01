import { times } from "lodash";
import { Coord, coordAdd, coordMul, Rect } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { strokeRect, UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_MENU_ITEM_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Character } from "./Character";

enum OpinionShield {
  negative = 0,
  positive = 1,
  colored = 2,
}

export class CharacterOpinionRenderer {
  private shieldSprites: SpriteSheet;

  constructor() {
    this.shieldSprites = SpriteLibrary.get("opinion-shield");
  }

  render(screen: PixelScreen, rect: Rect, character: Character, highlighted: boolean) {
    const iconRect: Rect = { coord: coordAdd(rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord = coordAdd(iconRect.coord, [18, -1]);
    const opinionCoord = coordAdd(nameCoord, [0, 10]);

    screen.drawRect(rect, UI_BG_COLOR);
    screen.drawRect(iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(character.getFaceSprite(), iconRect.coord);
    screen.drawText(character.getName(), nameCoord, { color: "#000", shadowColor: UI_SHADOW_COLOR });

    this.drawOpinion(screen, character.getOpinion(), opinionCoord);

    if (highlighted) {
      strokeRect(screen, rect, UI_MENU_ITEM_HIGHLIGHT_COLOR);
    }
  }

  private drawOpinion(screen: PixelScreen, opinion: number, offset: Coord) {
    times(10, (i) => {
      const coord = coordAdd(offset, coordMul([7, 0], [i, i]));
      screen.drawSprite(this.shieldSprites.getSprite([this.opinionShield(i + 1, opinion), 0]), coord);
    });
  }

  private opinionShield(level: number, opinion: number): OpinionShield {
    if (opinion >= level) {
      return OpinionShield.colored;
    }
    return level < 6 ? OpinionShield.negative : OpinionShield.positive;
  }
}
