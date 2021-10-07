import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";

export interface ActivityUpdates {
  coord?: Coord;
  sprites: Sprite[];
}

export interface Activity {
  tick: (entity: GameObject, world: GameWorld) => ActivityUpdates;
  isFinished: () => boolean;
  interact: (ui: UiController) => void;
  nextActivity(): Activity | undefined;
}
