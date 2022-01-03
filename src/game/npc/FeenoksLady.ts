import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { PixelScreen } from "../PixelScreen";
import { UiController } from "../UiController";
import { getCharacter } from "./characters";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Location } from "../locations/Location";
import { GameItem } from "../items/GameItem";
import { showPlainTextDialog } from "../dialogs/showPlainTextDialog";

export class FeenoksLady implements GameObject {
  constructor(private coord: Coord) {
  }

  tick(location: Location, world: GameWorld) {
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite("feenoks-lady"), this.coord);
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return false;
  }

  hitBox(): Rect {
    return { coord: [-7, -29], size: [14, 30] };
  }

  boundingBox(): Rect {
    return { coord: [-8, -2], size: [16, 5] };
  }

  isInteractable(ui: UiController, item?: GameItem) {
    return true;
  }

  interact(ui: UiController, item?: GameItem) {
    showPlainTextDialog({ ui, character: getCharacter("feenoks-lady"), text: "Teretulemast Feenoksi alkoparadiisi!" });
  }
}
