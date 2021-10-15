import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";

export interface ActivityUpdates {
  coord?: Coord;
  sprites?: Sprite[];
}

export interface Activity {
  tick: (entity: GameObject, location: Location, world: GameWorld) => ActivityUpdates;
  isFinished: () => boolean;
  isInteractable: (ui: UiController) => boolean;
  interact: (ui: UiController) => void;
  nextActivity(): Activity | undefined;
}
