import { compact } from "lodash";
import { ActivityGroup } from "../activities/ActivityGroup";
import { AvoidAnnoyancesActivity } from "../activities/AvoidAnnoyancesActivity";
import { BlockingActivity } from "../activities/BlockingActivity";
import { DespawnActivity } from "../activities/DespawnActivity";
import { GreetActivityTrigger } from "../activities/GreetActivityTrigger";
import { LeaveTableActivity } from "../activities/LeaveTableActivity";
import { MoveActivity } from "../activities/MoveActivity";
import { MoveToTableActivity } from "../activities/MoveToTableActivity";
import { SatisfyDesiresActivity } from "../activities/SatisfyDesiresActivity";
import { tileToScreenCoord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Scene } from "./Scene";
import { Spawner } from "./Spawner";

const SPAWN_COORD = tileToScreenCoord([12, 4]);

export class DrinkingScene implements Scene {
  private spawners = [
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([7, 6]), locationName: "cfe-cellar", characterName: "koppel", createActivity: createDrinkingActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([8, 6]), locationName: "cfe-cellar", characterName: "sass", createActivity: createDrinkingActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([9, 6]), locationName: "cfe-cellar", characterName: "pikmets", createActivity: createDrinkingActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([10, 6]), locationName: "cfe-cellar", characterName: "otto", createActivity: createDrinkingActivity },
      [10 * 10]: { coord: SPAWN_COORD, locationName: "cfe-cellar", characterName: "vanamees", createActivity: createDrinkingActivity },
      [20 * 10]: { coord: SPAWN_COORD, locationName: "cfe-cellar", characterName: "kark", createActivity: createDrinkingActivity },
    }),
  ];

  getStartLocation(): LocationName {
    return "cfe-cellar";
  }

  tick(world: GameWorld): void {
    this.spawners.forEach((s) => s.tick(world));
  }
}

function createDrinkingActivity(character: AcademicCharacter) {
  return new BlockingActivity({
    triggers: [new GreetActivityTrigger(character)],
    innerActivity: new ActivityGroup(createActivities(character)),
  });
}

function createActivities(character: AcademicCharacter) {
  return compact([
    new MoveToTableActivity(character),
    new AvoidAnnoyancesActivity(character, new SatisfyDesiresActivity(character)),
    new LeaveTableActivity(character),
    new MoveActivity(tileToScreenCoord([12, 4]), character),
    new DespawnActivity(character),
  ]);
}

