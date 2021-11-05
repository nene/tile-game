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

export function createCharacterActivities(character: Character): Activity[] {
  return [
    new MoveToDoorActivity(character),
    new EnterDoorActivity(character),
    new WriteToBookActivity(character),
    new PauseActivity(5, character),
    new MoveToTableActivity(character),
    new SatisfyDesiresActivity(character),
    new MoveToDoorActivity(character),
    new EnterDoorActivity(character),
    new MoveActivity(tileToScreenCoord([10, 15]), character),
    new DespawnActivity(character),
  ];
}
