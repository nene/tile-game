import { Coord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";

export interface ActivityUpdates {
  finished?: boolean;
  coord?: Coord;
  sprites: Sprite[];
}

export interface Activity {
  tick: (world: GameWorld) => ActivityUpdates;
  isFinished: () => boolean;
  interact: (ui: UiController) => void;
}
