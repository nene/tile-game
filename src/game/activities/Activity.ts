import { Coord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";

export interface ActivityUpdates {
  coord?: Coord;
  sprites?: Sprite[];
}

export interface Activity {
  tick: (figure: CharacterFigure, location: Location, world: GameWorld) => ActivityUpdates;
  isFinished: () => boolean;
  isInteractable: (ui: UiController) => boolean;
  interact: (ui: UiController, world: GameWorld) => void;
  nextActivity(): Activity | undefined;
}
