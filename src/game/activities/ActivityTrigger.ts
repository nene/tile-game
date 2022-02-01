import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity } from "./Activity";

export interface ActivityTrigger {
  shouldTrigger(figure: CharacterFigure, location: Location, world: GameWorld): boolean;
  createActivity(): Activity;
}
