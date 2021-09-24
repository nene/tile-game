import { CallFuxActivity } from "./activities/CallFuxActivity";
import { Coord, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { Activity } from "./activities/Activity";
import { MoveActivity } from "./activities/MoveActivity";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";
import { DrinkActivity } from "./activities/DrinkActivity";
import { UiController } from "./UiController";
import { BeerGlass } from "./items/BeerGlass";

interface BurshConfig {
  spriteType: 0 | 1 | 2;
  name: string;
}

export class Bursh implements GameObject {
  private type: 0 | 1 | 2;
  private name: string;
  private activities: Activity[] = [];
  private sprites: Sprite[] = [];

  constructor(private coord: Coord, private spriteLib: SpriteLibrary, cfg: BurshConfig) {
    this.type = cfg.spriteType;
    this.name = cfg.name;
  }

  moveTo(destination: Coord) {
    this.activities.push(new MoveActivity(this.coord, destination, this.type, this.spriteLib));
    this.activities.push(new CallFuxActivity(this.type, this.spriteLib));
  }

  tick(world: GameWorld) {
    // run activities in queue
    if (this.activities.length > 0) {
      const activity = this.activities[0];
      const updates = activity.tick(world);
      if (updates.coord) {
        this.coord = updates.coord;
      }
      this.sprites = updates.sprites || [];
      if (updates.finished) {
        this.activities.shift();
      }
    }
  }

  paint(screen: PixelScreen) {
    this.sprites.forEach((sprite) => {
      screen.drawSprite(sprite, this.coord);
    });
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

  tileSize(): Coord {
    return [1, 1];
  }

  hitBox(): Rect {
    return { coord: [-7, -29], size: [14, 30] };
  }

  onInteract(uiController: UiController) {
    const item = uiController.getSelectedItem();
    if (item instanceof BeerGlass) {
      uiController.removeSelectedItem();
      this.activities.unshift(new DrinkActivity(item, this.spriteLib));
    } else {
      console.log("You talked to " + this.name);
    }
  }
}
