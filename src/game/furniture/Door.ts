import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";
import { LocationName } from "../locations/LocationFactory";
import { Location } from "../locations/Location";

export interface DoorConfig {
  coord: Coord;
  sprite: Sprite;
  from: LocationName;
  to: LocationName;
  teleportOffset?: Coord;
  debug?: boolean;
}

export class Door implements GameObject {
  private coord: Coord;
  private fromLocation: LocationName;
  private toLocation: LocationName;
  private sprite: Sprite;
  private teleportOffset: Coord;
  private debug?: boolean;

  constructor({ coord, sprite, from, to, teleportOffset, debug }: DoorConfig) {
    this.coord = coord;
    this.sprite = sprite;
    this.fromLocation = from;
    this.toLocation = to;
    this.teleportOffset = teleportOffset ?? [8, 8];
    this.debug = debug;
  }

  tick() {
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
    if (this.debug) {
      screen.drawRect({ coord: coordAdd(this.coord, this.sprite.offset), size: this.sprite.size }, "rgba(0,255,0,0.5)");
    }
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
