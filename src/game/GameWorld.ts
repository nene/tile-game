import { LocationFactory, LocationName } from "./locations/LocationFactory";
import { Location, TeleportCommand } from "./locations/Location";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Player } from "./player/Player";
import { Coord, Rect, rectDistance, rectTranslate } from "./Coord";
import { UiController } from "./UiController";

interface GameWorldConfig {
  locations: LocationFactory[];
  startLocation: LocationName;
}

export class GameWorld {
  private locations: Map<LocationName, Location>;
  private activeLocation: Location;
  private player: Player;

  constructor({ locations, startLocation }: GameWorldConfig) {
    this.locations = new Map(locations.map((loc) => [loc.getName(), new Location(loc)]));
    this.activeLocation = this.getLocation(startLocation);
    this.player = new Player(this.activeLocation.getPlayerSpawnCoord());
    this.activeLocation.add(this.player);
    this.activeLocation.activate();
  }

  getActiveLocation(): Location {
    return this.activeLocation;
  }

  getPlayer(): Player {
    return this.player;
  }

  getLocation(name: LocationName): Location {
    return this.locations.get(name) as Location;
  }

  tick() {
    const commands: TeleportCommand[] = [];
    this.locations.forEach((location) => {
      commands.push(...location.tick(this));
    });

    commands.forEach((cmd) => this.runTeleportCommand(cmd));
  }

  paint(screen: PixelScreen) {
    screen.centerTo(this.player.getCoord(), this.activeLocation);
    this.activeLocation.paint(screen);
  }

  private runTeleportCommand(cmd: TeleportCommand) {
    const newLocation = this.getLocation(cmd.toLocation);
    this.teleport(cmd.entity, newLocation);
    cmd.entity.setCoord(cmd.coord);
  }

  teleport(object: GameObject, location: Location) {
    this.activeLocation.remove(object);
    this.activeLocation = location;
    this.activeLocation.add(object);
    this.activeLocation.activate();
  }

  isInteractable(ui: UiController, worldCoord: Coord): boolean {
    const obj = this.activeLocation.getObjectVisibleOnCoord(worldCoord);
    return Boolean(
      obj &&
      isObjectsCloseby(this.player, obj) &&
      this.player.isFree() &&
      obj.isInteractable(ui, ui.getAttributes().getSelectedItem())
    );
  }

  interact(ui: UiController, worldCoord: Coord) {
    const obj = this.activeLocation.getObjectVisibleOnCoord(worldCoord);
    if (obj && isObjectsCloseby(this.player, obj) && this.player.isFree()) {
      obj.interact(ui, ui.getAttributes().getSelectedItem());
    }
  }
}

function isObjectsCloseby(obj1: GameObject, obj2: GameObject) {
  return rectDistance(objectBounds(obj1), objectBounds(obj2)) < 16;
}

function objectBounds(obj: GameObject): Rect {
  return rectTranslate(obj.boundingBox(), obj.getCoord());
}
