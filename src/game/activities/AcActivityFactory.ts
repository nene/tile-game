import { Coord } from "../Coord";
import { LocationName } from "../locations/LocationFactory";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Activity } from "./Activity";
import { ActivityGroup } from "./ActivityGroup";
import { AvoidAnnoyancesActivity } from "./AvoidAnnoyancesActivity";
import { BlockingActivity } from "./BlockingActivity";
import { DespawnActivity } from "./DespawnActivity";
import { EnterDoorActivity } from "./EnterDoorActivity";
import { GreetActivityTrigger } from "./GreetActivityTrigger";
import { LeaveTableActivity } from "./LeaveTableActivity";
import { MoveActivity } from "./MoveActivity";
import { MoveToDoorActivity } from "./MoveToDoorActivity";
import { MoveToTableActivity } from "./MoveToTableActivity";
import { PauseActivity } from "./PauseActivity";
import { SatisfyDesiresActivity } from "./SatisfyDesiresActivity";
import { WriteToBookActivity } from "./WriteToBookActivity";

export class AcActivityFactory {
  private activities: Activity[] = [];

  constructor(private character: AcademicCharacter) { }

  pause(numberOfTicks: number): this {
    this.activities.push(new PauseActivity(numberOfTicks, this.character));
    return this;
  }

  writeToBook(): this {
    if (this.character.isRememberingBookWriting()) {
      this.activities.push(new WriteToBookActivity(this.character));
    }
    return this;
  }

  moveToLocation(loc: LocationName): this {
    this.activities.push(
      new MoveToDoorActivity(loc, this.character),
      new EnterDoorActivity(loc, this.character),
    );
    return this;
  }

  moveToCoord(coord: Coord): this {
    this.activities.push(new MoveActivity(coord, this.character));
    return this;
  }

  sitInTable(): this {
    this.activities.push(
      new MoveToTableActivity(this.character),
      new AvoidAnnoyancesActivity(this.character, new SatisfyDesiresActivity(this.character)),
      new LeaveTableActivity(this.character),
    );
    return this;
  }

  despawn(): this {
    this.activities.push(new DespawnActivity(this.character));
    return this;
  }

  create(): Activity {
    return new BlockingActivity({
      triggers: [new GreetActivityTrigger(this.character)],
      innerActivity: new ActivityGroup(this.activities),
    });
  }
}
