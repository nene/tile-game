import { AcActivityFactory } from "../activities/AcActivityFactory";
import { tileToScreenCoord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Scene, WorldPosition } from "./Scene";
import { Spawner } from "./Spawner";

const SPAWN_COORD = tileToScreenCoord([12, 4]);

export class DrinkingScene implements Scene {
  private spawners = [
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([7, 6]), locationName: "cfe-cellar", characterName: "koppel", createActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([8, 6]), locationName: "cfe-cellar", characterName: "sass", createActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([9, 6]), locationName: "cfe-cellar", characterName: "pikmets", createActivity },
    }),
    new Spawner<AcademicCharacter>({
      1: { coord: tileToScreenCoord([10, 6]), locationName: "cfe-cellar", characterName: "otto", createActivity },
      [10 * 10]: { coord: SPAWN_COORD, locationName: "cfe-cellar", characterName: "vanamees", createActivity },
      [20 * 10]: { coord: SPAWN_COORD, locationName: "cfe-cellar", characterName: "kark", createActivity },
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
    .sitInTable()
    .moveToCoord(tileToScreenCoord([12, 4]))
    .despawn()
    .create();
}
