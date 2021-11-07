import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";
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

  constructor({ coord, spriteName, target }: DoorConfig) {
    this.coord = coord;
    this.sprite = SpriteLibrary.getSprite(spriteName);
    this.target = target;
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

  onInteract(ui: UiController) {
    const world = ui.getWorld();
    const newLocation = world.getLocation(this.target.location);
    const door = newLocation.allObjects().find(obj => obj instanceof Door);
    if (!door) {
      throw new Error("No door found in the other location");
    }
    world.teleport(world.getPlayer(), newLocation);
    world.getPlayer().setCoord(coordAdd(door.getCoord(), [8, 8]));
  }

  getTarget(): DoorTarget {
    return this.target;
  }
}
