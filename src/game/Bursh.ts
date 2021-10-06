import { CallFuxActivity } from "./activities/CallFuxActivity";
import { Coord, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { Activity } from "./activities/Activity";
import { MoveActivity } from "./activities/MoveActivity";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./sprites/Sprite";
import { DrinkActivity } from "./activities/DrinkActivity";
import { UiController } from "./UiController";
import { BeerGlass } from "./items/BeerGlass";
import { Dialog } from "./Dialog";
import { Character } from "./npc/Character";

export class Bursh implements GameObject {
  private coord: Coord;
  private activities: Activity[] = [];
  private sprites: Sprite[] = [];

  constructor(private character: Character) {
    this.coord = character.startCoord;
  }

  getName() {
    return this.character.name;
  }

  moveTo(destination: Coord) {
    this.activities.push(new MoveActivity(this.coord, destination, this.character));
    this.activities.push(new CallFuxActivity(this.character));
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

  hitBox(): Rect {
    return { coord: [-7, -29], size: [14, 30] };
  }

  boundingBox(): Rect {
    return { coord: [-8, -3], size: [16, 5] };
  }

  onInteract(uiController: UiController) {
    const item = uiController.getSelectedItem();
    if (item instanceof BeerGlass) {
      uiController.removeSelectedItem();
      this.activities.unshift(new DrinkActivity(item, this.character));
    } else {
      uiController.showDialog(new Dialog(this, "Tere, uus rebane!\n\nKüll on tore, et sa meiega liitusid."));
    }
  }
}
