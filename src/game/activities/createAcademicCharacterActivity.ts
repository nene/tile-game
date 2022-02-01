import { Activity } from "./Activity";
import { MoveToTableActivity } from "./MoveToTableActivity";
import { MoveToDoorActivity } from "./MoveToDoorActivity";
import { DespawnActivity } from "./DespawnActivity";
import { PauseActivity } from "./PauseActivity";
import { SatisfyDesiresActivity } from "./SatisfyDesiresActivity";
import { EnterDoorActivity } from "./EnterDoorActivity";
import { MoveActivity } from "./MoveActivity";
import { tileToScreenCoord } from "../Coord";
import { WriteToBookActivity } from "./WriteToBookActivity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { compact } from "lodash";
import { LocationName } from "../locations/LocationFactory";
import { LeaveTableActivity } from "./LeaveTableActivity";
import { AvoidAnnoyancesActivity } from "./AvoidAnnoyancesActivity";
import { GreetActivity } from "./GreetActivity";
import { ActivityGroup } from "./ActivityGroup";

export function createAcademicCharacterActivity(character: AcademicCharacter): Activity {
  return new ActivityGroup(createActivities(character));
}

function createActivities(character: AcademicCharacter): Activity[] {
  return compact([
    // ...travel(["cfe-hall"], character),
    character.isRememberingBookWriting() ? new WriteToBookActivity(character) : undefined,
    ...travel(["cfe-cellar"], character),
    new PauseActivity(5, character),
    new GreetActivity(character),
    new MoveToTableActivity(character),
    new AvoidAnnoyancesActivity(character, new SatisfyDesiresActivity(character)),
    new LeaveTableActivity(character),
    // ...travel(["cfe-hall", "outdoors"], character),
    // new MoveActivity(tileToScreenCoord([10, 15]), character),
    ...travel(["cfe-hall"], character),
    new MoveActivity(tileToScreenCoord([9, 6]), character),
    new DespawnActivity(character),
  ]);
}

function travel(locations: LocationName[], character: AcademicCharacter): Activity[] {
  return locations.flatMap((loc) => [
    new MoveToDoorActivity(loc, character),
    new EnterDoorActivity(loc, character),
  ]);
}
