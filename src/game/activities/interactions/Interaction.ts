import { GameWorld } from "../../GameWorld";
import { GameItem } from "../../items/GameItem";
import { CharacterFigure } from "../../npc/CharacterFigure";
import { UiController } from "../../UiController";
import { Activity } from "../Activity";
import { Location } from "../../locations/Location";

export enum InteractionType {
  glass = 0,
  beer = 1,
  water = 2,
  question = 3,
  bottle = 4,
  emptyBottle = 5,
}

export interface Interaction {
  tryComplete: (figure: CharacterFigure, location: Location, world: GameWorld) => boolean;
  interact: (ui: UiController, item?: GameItem) => void;
  isFinished: () => boolean;
  nextActivity: () => Activity | undefined;
  getType: () => InteractionType;
}
