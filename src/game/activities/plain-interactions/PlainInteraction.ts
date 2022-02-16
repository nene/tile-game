import { GameItem } from "../../items/GameItem";
import { UiApi } from "../../UiController";
import { Activity } from "../Activity";

export type InteractionResult = { type: "activity"; activity: Activity } | { type: "done" };

export interface PlainInteraction {
  interact: (ui: UiApi, item?: GameItem) => InteractionResult | undefined;
}
