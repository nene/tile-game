import { Activity } from "../activities/Activity";
import { Coord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";
import { Character } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { CharacterName, getCharacter } from "../npc/characters";

interface SpawnDef<T extends Character> {
  coord: Coord;
  locationName: LocationName;
  characterName: CharacterName;
  createActivity: (char: T) => Activity;
};

export class Spawner<T extends Character> {
  private ticks = 0;

  constructor(private spawns: Record<number, SpawnDef<T>>) { }

  tick(world: GameWorld): void {
    this.ticks++;

    const spawnDef: SpawnDef<T> | undefined = this.spawns[this.ticks];
    if (spawnDef) {
      this.spawnCharacter(world, spawnDef);
    }
  }

  private spawnCharacter(world: GameWorld, { locationName, coord, characterName, createActivity }: SpawnDef<T>) {
    world.getLocation(locationName).add(new CharacterFigure(coord, this.initCharacter(characterName, createActivity)));
  }

  private initCharacter(characterName: CharacterName, createActivity: (char: T) => Activity) {
    const character = getCharacter(characterName) as T;
    character.setActivity(createActivity(character));
    return character;
  }
}
