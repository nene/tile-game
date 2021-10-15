import { CharacterFigure } from "../npc/CharacterFigure";
import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { Character, getAllCharacters } from "../npc/Character";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { Location } from "../locations/Location";
import { UiController } from "../UiController";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";

export interface DoorConfig {
  coord: Coord;
  spriteName: SpriteName;
  target: DoorTarget;
}

export interface DoorTarget {
  location: LocationName;
}

export class Door implements GameObject {
  private coord: Coord;
  private target: DoorTarget;
  private sprite: Sprite;
  private tickCount: number = 0;

  constructor({ coord, spriteName, target }: DoorConfig) {
    this.coord = coord;
    this.sprite = SpriteLibrary.getSprite(spriteName);
    this.target = target;
  }

  tick(location: Location) {
    this.tickCount++;

    const character = this.trySpawnCharacter(location);
    if (character) {
      location.add(new CharacterFigure(this.spawnPoint(), character));
    }
  }

  private trySpawnCharacter(location: Location): Character | undefined {
    if (location.getName() === "cfe") {
      return getAllCharacters().find((char) => char.spawnTime === this.tickCount);
    }
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
    return { coord: this.sprite.offset, size: this.sprite.size };
  }

  boundingBox(): Rect {
    return { coord: this.sprite.offset, size: this.sprite.size };
  }

  isInteractable() {
    return true;
  }

  onInteract(ui: UiController, world: GameWorld) {
    const newLocation = world.getLocation(this.target.location);
    const door = newLocation.allObjects().find(obj => obj instanceof Door);
    if (!door) {
      throw new Error("No door found in the other location");
    }
    world.teleport(world.getPlayer(), newLocation);
    world.getPlayer().setCoord(coordAdd(door.getCoord(), [8, 8]));
  }
}
