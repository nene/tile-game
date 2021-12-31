import { Coord, coordAdd, Rect, rectAlign, rectContains, rectTranslate } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";
import { LocationName } from "../locations/LocationFactory";
import { Location, TeleportCommand } from "../locations/Location";
import { GameWorld } from "../GameWorld";
import { isPlayer, Player } from "../player/Player";

export interface DoorConfig {
  coord: Coord;
  area: Sprite | Rect;
  from: LocationName;
  to: LocationName;
  teleportOffset?: Coord;
  autoTeleportSide?: "top" | "bottom";
  debug?: boolean;
}

export class Door implements GameObject {
  private coord: Coord;
  private fromLocation: LocationName;
  private toLocation: LocationName;
  private sprite?: Sprite;
  private rect: Rect;
  private teleportOffset: Coord;
  private debug?: boolean;
  private autoTeleportArea?: Rect;

  constructor({ coord, area, from, to, teleportOffset, autoTeleportSide, debug }: DoorConfig) {
    this.coord = coord;
    if (isSprite(area)) {
      this.sprite = area;
      this.rect = { coord: this.sprite.offset, size: this.sprite.size };
    } else {
      this.rect = area;
    }
    this.fromLocation = from;
    this.toLocation = to;
    this.teleportOffset = teleportOffset ?? [8, 8];
    if (autoTeleportSide) {
      const height = autoTeleportSide === "bottom" ? 8 : 22;
      this.autoTeleportArea = rectAlign({ coord: [0, 0], size: [this.rect.size[0], height] }, this.rect, autoTeleportSide);
    }
    this.debug = debug;
  }

  tick(location: Location, world: GameWorld): void | TeleportCommand {
    if (!this.autoTeleportArea || world.getActiveLocation() !== location) {
      return;
    }

    const player = location.allObjects().find(isPlayer);
    if (player && this.isInAutoTeleportArea(player, this.autoTeleportArea)) {
      return {
        entity: world.getPlayer(),
        fromLocation: this.fromLocation,
        toLocation: this.toLocation,
        coord: findDoor(world.getLocation(this.toLocation), this.fromLocation).getTeleportCoord(),
      };
    }
  }

  private isInAutoTeleportArea(player: Player, autoTeleportArea: Rect): boolean {
    return rectContains(rectTranslate(autoTeleportArea, this.coord), rectTranslate(player.boundingBox(), player.getCoord()));
  }

  paint(screen: PixelScreen) {
    if (this.sprite) {
      screen.drawSprite(this.sprite, this.coord);
    }
    if (this.debug) {
      screen.drawRect(rectTranslate(this.rect, this.coord), "rgba(0,255,0,0.5)");
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
    return this.rect;
  }

  boundingBox(): Rect {
    return this.rect;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    this.teleport(ui.getWorld());
  }

  private teleport(world: GameWorld) {
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

const isSprite = (area: Sprite | Rect): area is Sprite => area.hasOwnProperty("image");
