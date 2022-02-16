import { Coord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { GameItem } from "../items/GameItem";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Sprite } from "../sprites/Sprite";
import { UiApi } from "../UiController";

export interface ActivityUpdates {
  coord?: Coord;
  sprites?: Sprite[];
}

export interface Activity {
  tick: (figure: CharacterFigure, location: Location, world: GameWorld) => ActivityUpdates;
  isFinished: () => boolean;
  isInteractable: (ui: UiApi, item?: GameItem) => boolean;
  interact: (ui: UiApi, item?: GameItem) => void;
  nextActivity(): Activity | undefined;
}
