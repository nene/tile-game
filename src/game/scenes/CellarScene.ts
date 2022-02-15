import { createAcademicCharacterActivity } from "../activities/createAcademicCharacterActivity";
import { SellAlcoholActivity } from "../activities/SellAlcoholActivity";
import { Coord, coordAdd, tileToScreenCoord } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";
import { isAcademicCharacter } from "../npc/AcademicCharacter";
import { CharacterFigure } from "../npc/CharacterFigure";
import { CharacterName, getCharacter } from "../npc/characters";
import { isFeenoksLadyCharacter } from "../npc/FeenoksLadyCharacter";
import { Scene } from "./Scene";

const SPAWN_COORD = coordAdd(tileToScreenCoord([9, 6]), [8, 8]);
const FEENOKS_LADY_COORD = tileToScreenCoord([12, 5]);

type SpawnDef = { coord: Coord, locationName: LocationName, characterName: CharacterName };

export class CellarScene implements Scene {
  private ticks = 0;

  private spawns: Record<number, SpawnDef> = {
    1: { coord: FEENOKS_LADY_COORD, locationName: "feenoks", characterName: "feenoks-lady" },
    [1 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "koppel" },
    [5 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "sass" },
    [20 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "pikmets" },
    [30 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "otto" },
    [32 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "vanamees" },
    [40 * 10]: { coord: SPAWN_COORD, locationName: "cfe-hall", characterName: "kark" },
  };

  getStartLocation(): LocationName {
    return "cfe-cellar";
  }

  getInitialObjects(): Map<LocationName, GameObject[]> {
    return new Map();
  }

  tick(world: GameWorld): void {
    this.ticks++;

    const spawnDef: SpawnDef | undefined = this.spawns[this.ticks];
    if (spawnDef) {
      this.spawnCharacter(world, spawnDef);
    }
  }

  private spawnCharacter(world: GameWorld, { locationName, coord, characterName }: SpawnDef) {
    world.getLocation(locationName).add(new CharacterFigure(coord, this.initCharacter(characterName)));
  }

  private initCharacter(characterName: CharacterName) {
    const character = getCharacter(characterName);
    if (isAcademicCharacter(character)) {
      character.setActivity(createAcademicCharacterActivity(character));
    }
    if (isFeenoksLadyCharacter(character)) {
      character.setActivity(new SellAlcoholActivity(character));
    }
    return character;
  }
}
