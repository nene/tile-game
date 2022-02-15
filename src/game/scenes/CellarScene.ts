import { AcActivityFactory } from "../activities/AcActivityFactory";
import { SellAlcoholActivity } from "../activities/SellAlcoholActivity";
import { tileToScreenCoord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { FeenoksLadyCharacter } from "../npc/FeenoksLadyCharacter";
import { Scene, WorldPosition } from "./Scene";
import { Spawner } from "./Spawner";

const SPAWN_COORD = tileToScreenCoord([10, 15]);
const FEENOKS_LADY_COORD = tileToScreenCoord([12, 5]);

export class CellarScene implements Scene {
  private spawners = [
    new Spawner<FeenoksLadyCharacter>({
      1: { coord: FEENOKS_LADY_COORD, locationName: "feenoks", characterName: "feenoks-lady", createActivity: (char) => new SellAlcoholActivity(char) },
    }),
    new Spawner<AcademicCharacter>({
      [1 * 10]: { coord: SPAWN_COORD, locationName: "outdoors", characterName: "koppel", createActivity },
      [5 * 10]: { coord: SPAWN_COORD, locationName: "outdoors", characterName: "sass", createActivity },
      [20 * 10]: { coord: SPAWN_COORD, locationName: "outdoors", characterName: "pikmets", createActivity },
      [30 * 10]: { coord: SPAWN_COORD, locationName: "outdoors", characterName: "otto", createActivity },
      [32 * 10]: { coord: SPAWN_COORD, locationName: "outdoors", characterName: "vanamees", createActivity },
      [40 * 10]: { coord: SPAWN_COORD, locationName: "outdoors", characterName: "kark", createActivity },
    }),
  ];

  getStartPosition(): WorldPosition {
    return { location: "cfe-cellar", coord: tileToScreenCoord([13, 9]) };
  }

  tick(world: GameWorld): void {
    this.spawners.forEach((s) => s.tick(world));
  }
}

function createActivity(character: AcademicCharacter) {
  return new AcActivityFactory(character)
    .moveToLocation("cfe-hall")
    .writeToBook()
    .moveToLocation("cfe-cellar")
    .pause(5)
    .sitInTable()
    .moveToLocation("cfe-hall")
    .moveToLocation("outdoors")
    .moveToCoord(tileToScreenCoord([10, 15]))
    .despawn()
    .create();
}
