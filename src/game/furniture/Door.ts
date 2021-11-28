import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";
import { LocationName } from "../locations/LocationFactory";
import { Location } from "../locations/Location";

export interface DoorConfig {
  coord: Coord;
  spriteName: SpriteName;
  spriteCoord?: Coord;
  from: LocationName;
  to: LocationName;
  teleportOffset?: Coord;
}

export class Door implements GameObject {
  private coord: Coord;
  private fromLocation: LocationName;
  private toLocation: LocationName;
  private sprite: Sprite;
  private teleportOffset: Coord;

  constructor({ coord, spriteName, spriteCoord, from, to, teleportOffset }: DoorConfig) {
    this.coord = coord;
    this.sprite = SpriteLibrary.getSprite(spriteName, spriteCoord);
    this.fromLocation = from;
    this.toLocation = to;
    this.teleportOffset = teleportOffset ?? [8, 8];
  }

  tick() {
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
    return false;
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

  interact(ui: UiController) {
    const world = ui.getWorld();
    world.getActiveLocation();
    const newLocation = world.getLocation(this.toLocation);
    const door = findDoor(newLocation, this.fromLocation);
    world.teleport(world.getPlayer(), newLocation);
    world.getPlayer().setCoord(door.getTeleportCoord());
  }

  getToLocation(): LocationName {
    return this.toLocation;
  }

  getTeleportCoord(): Coord {
    return coordAdd(this.getCoord(), this.teleportOffset);
  }
}

export const isDoor = (obj: GameObject): obj is Door => obj instanceof Door;

export const findDoor = (location: Location, target: LocationName): Door => {
  const door = location.allObjects().filter(isDoor).find((door) => door.getToLocation() === target);
  if (!door) {
    throw new Error(`No door to ${target} found in ${location.getName()}`);
  }
  return door;
};
