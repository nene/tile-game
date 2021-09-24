import { Coord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { Sprite } from "../Sprite";

export interface ActivityUpdates {
  finished?: boolean;
  coord?: Coord;
  sprites: Sprite[];
}

export interface Activity {
  tick: (world: GameWorld) => ActivityUpdates;
}
