import { AcActivityFactory } from "../activities/AcActivityFactory";
import { tileCenterCoord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Scene, WorldPosition } from "./Scene";
import { Spawner } from "./Spawner";

const oldermanCoord = tileCenterCoord([4, 9]);

export class StartScene implements Scene {
  private spawners = [
    new Spawner<AcademicCharacter>({
      1: { coord: oldermanCoord, locationName: "cfe-hall", characterName: "vanamees", createActivity },
    }),
  ];

  getStartPosition(): WorldPosition {
    return { location: "cfe-hall", coord: tileCenterCoord([9, 9]) };
  }

  tick(world: GameWorld): void {
    this.spawners.forEach((s) => s.tick(world));
  }
}

function createActivity(character: AcademicCharacter) {
  return new AcActivityFactory(character)
    .moveToCoord(tileCenterCoord([8, 9]))
    .pause(2 * 10)
    .moveToCoord(oldermanCoord)
    .despawn()
    .create();
}
