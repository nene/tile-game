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
import { AcademicCharacter } from "./AcademicCharacter";
import { compact } from "lodash";
import { LocationName } from "../locations/LocationFactory";
import { LeaveTableActivity } from "../activities/LeaveTableActivity";

export function createCharacterActivities(character: AcademicCharacter): Activity[] {
  return compact([
    ...travel(["cfe-hall"], character),
    character.isRememberingBookWriting() ? new WriteToBookActivity(character) : undefined,
    ...travel(["cfe-cellar"], character),
    new PauseActivity(5, character),
    new MoveToTableActivity(character),
    new SatisfyDesiresActivity(character),
    new LeaveTableActivity(character),
    ...travel(["cfe-hall", "outdoors"], character),
    new MoveActivity(tileToScreenCoord([10, 15]), character),
    new DespawnActivity(character),
  ]);
}

function travel(locations: LocationName[], character: AcademicCharacter): Activity[] {
  return locations.flatMap((loc) => [
    new MoveToDoorActivity(loc, character),
    new EnterDoorActivity(loc, character),
  ]);
}
