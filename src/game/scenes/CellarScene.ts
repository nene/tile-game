import { createAcademicCharacterActivity } from "../activities/createAcademicCharacterActivity";
import { SellAlcoholActivity } from "../activities/SellAlcoholActivity";
import { coordAdd, tileToScreenCoord } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { FeenoksLadyCharacter } from "../npc/FeenoksLadyCharacter";
import { Scene } from "./Scene";
import { Spawner } from "./Spawner";

const SPAWN_COORD = coordAdd(tileToScreenCoord([9, 6]), [8, 8]);
const FEENOKS_LADY_COORD = tileToScreenCoord([12, 5]);

export class CellarScene implements Scene {
  private spawners = [
    new Spawner<FeenoksLadyCharacter>({
      1: { coord: FEENOKS_LADY_COORD, locationName: "feenoks", characterName: "feenoks-lady", createActivity: (char) => new SellAlcoholActivity(char) },
    }),
    new Spawner<AcademicCharacter>({
      [1 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "koppel", createActivity: createAcademicCharacterActivity },
      [5 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "sass", createActivity: createAcademicCharacterActivity },
      [20 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "pikmets", createActivity: createAcademicCharacterActivity },
      [30 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "otto", createActivity: createAcademicCharacterActivity },
      [32 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "vanamees", createActivity: createAcademicCharacterActivity },
      [40 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "kark", createActivity: createAcademicCharacterActivity },
    }),
  ];

  getStartLocation(): LocationName {
    return "cfe-cellar";
  }

  getInitialObjects(): Map<LocationName, GameObject[]> {
    return new Map();
  }

  tick(world: GameWorld): void {
    this.spawners.forEach((s) => s.tick(world));
  }
}
