import { GameItem } from "../../items/GameItem";
import { UiController } from "../../UiController";
import { Activity } from "../Activity";

export enum InteractionType {
  glass = 0,
  beer = 1,
  water = 2,
  question = 3,
  bottle = 4,
  emptyBottle = 5,
}

export interface Interaction {
  interact: (ui: UiController, item?: GameItem) => void;
  isFinished: () => boolean;
  nextActivity: () => Activity | undefined;
  getType: () => InteractionType;
}
