import { AcActivityFactory } from "../activities/AcActivityFactory";
import { tileCenterCoord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Scene, WorldPosition } from "./Scene";
import { Spawner } from "./Spawner";

const SPAWN_COORD = tileCenterCoord([12, 4]);

export class DrinkingScene implements Scene {
  private spawners = [
    new Spawner<AcademicCharacter>({
      1: { coord: tileCenterCoord([6, 5]), locationName: "cfe-cellar", characterName: "koppel", createActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileCenterCoord([2, 5]), locationName: "cfe-cellar", characterName: "sass", createActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileCenterCoord([18, 13]), locationName: "cfe-cellar", characterName: "pikmets", createActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileCenterCoord([4, 9]), locationName: "cfe-cellar", characterName: "otto", createActivity },
      [10 * 10]: { coord: SPAWN_COORD, locationName: "cfe-cellar", characterName: "vanamees", createActivity },
      [20 * 10]: { coord: SPAWN_COORD, locationName: "cfe-cellar", characterName: "kark", createActivity },
    }),
  ];

  getStartPosition(): WorldPosition {
    return { location: "cfe-cellar", coord: tileCenterCoord([12, 8]) };
  }

  tick(world: GameWorld): void {
    this.spawners.forEach((s) => s.tick(world));
  }
}

function createActivity(character: AcademicCharacter) {
  return new AcActivityFactory(character)
    .sitInTable()
    .moveToCoord(tileCenterCoord([12, 4]))
    .despawn()
    .create();
}
