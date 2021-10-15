import { CharacterFigure } from "../npc/CharacterFigure";
import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { Character, getAllCharacters } from "../npc/Character";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Location } from "../locations/Location";

export class Door implements GameObject {
  private sprite: Sprite;
  private tickCount: number = 0;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.get("door").getSprite([0, 0]);
  }

  tick(location: Location) {
    this.tickCount++;

    const character = this.trySpawnCharacter();
    if (character) {
      location.add(new CharacterFigure(this.spawnPoint(), character));
    }
  }

  private trySpawnCharacter(): Character | undefined {
    return getAllCharacters().find((char) => char.spawnTime === this.tickCount);
  }

  private spawnPoint(): Coord {
    return coordAdd(this.coord, [8, 8]);
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return true;
  }

  hitBox(): Rect {
    return { coord: [-1, -33], size: [18, 33] };
  }

  boundingBox(): Rect {
    return { coord: [-1, -33], size: [18, 33] };
  }

  isInteractable() {
    return false;
  }

  onInteract() { }
}
