import { CharacterFigure } from "../npc/CharacterFigure";
import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { getAllCharacters } from "../npc/characters";
import { Location } from "../locations/Location";

export class SpawnPoint implements GameObject {
  private tickCount: number = 0;

  constructor(private coord: Coord) { }

  tick(location: Location) {
    this.tickCount++;

    const character = this.trySpawnCharacter();
    if (character) {
      location.add(new CharacterFigure(coordAdd(this.coord, [8, 8]), character));
    }
  }

  private trySpawnCharacter(): AcademicCharacter | undefined {
    return getAllCharacters().find((char) => char.getSpawnTime() === this.tickCount);
  }

  paint() { }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return false;
  }

  hitBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}
