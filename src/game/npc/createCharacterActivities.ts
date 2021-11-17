import { Activity } from "../activities/Activity";
import { MoveToTableActivity } from "../activities/MoveToTableActivity";
import { MoveToDoorActivity } from "../activities/MoveToDoorActivity";
import { DespawnActivity } from "../activities/DespawnActivity";
import { PauseActivity } from "../activities/PauseActivity";
import { SatisfyDesiresActivity } from "../activities/SatisfyDesiresActivity";
import { EnterDoorActivity } from "../activities/EnterDoorActivity";
import { MoveActivity } from "../activities/MoveActivity";
import { tileToScreenCoord } from "../Coord";
import { WriteToBookActivity } from "../activities/WriteToBookActivity";
import { Character } from "./Character";
import { compact } from "lodash";

export function createCharacterActivities(character: Character): Activity[] {
  return compact([
    new MoveToDoorActivity(character),
    new EnterDoorActivity(character),
    character.isRememberingBookWriting() ? new WriteToBookActivity(character) : undefined,
    new PauseActivity(5, character),
    new MoveToTableActivity(character),
    new SatisfyDesiresActivity(character),
    new MoveToDoorActivity(character),
    new EnterDoorActivity(character),
    new MoveActivity(tileToScreenCoord([10, 15]), character),
    new DespawnActivity(character),
  ]);
}
