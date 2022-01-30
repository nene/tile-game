import { Activity } from "../Activity";
import { Location } from "../../locations/Location";
import { CharacterFigure } from "../../npc/CharacterFigure";
import { GameWorld } from "../../GameWorld";

export interface Completion {
  tryComplete(figure: CharacterFigure, location: Location, world: GameWorld): boolean;
  isComplete(): boolean;
  nextActivity(): Activity | undefined;
}
