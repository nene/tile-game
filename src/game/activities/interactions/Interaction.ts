import { GameItem } from "../../items/GameItem";
import { UiController } from "../../UiController";
import { Activity } from "../Activity";

export enum InteractionType {
  beer = 0,
  water = 1,
  question = 2,
}

export interface Interaction {
  interact: (ui: UiController, item?: GameItem) => void;
  isFinished: () => boolean;
  nextActivity: () => Activity | undefined;
  getType: () => InteractionType;
}
