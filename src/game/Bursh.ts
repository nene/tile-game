import { Coord, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { MoveActivity } from "./activities/MoveActivity";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./sprites/Sprite";
import { DrinkActivity } from "./activities/DrinkActivity";
import { UiController } from "./UiController";
import { BeerGlass } from "./items/BeerGlass";
import { Dialog } from "./Dialog";
import { Character } from "./npc/Character";
import { Desires } from "./npc/Desires";

export class Bursh implements GameObject {
  private coord: Coord;
  private desires: Desires;
  private sprites: Sprite[] = [];

  constructor(private character: Character) {
    this.coord = character.startCoord;
    this.desires = new Desires(character);
  }

  getName() {
    return this.character.name;
  }

  moveTo(destination: Coord) {
    this.desires.startActivity(new MoveActivity(this.coord, destination, this.character));
  }

  tick(world: GameWorld) {
    const activity = this.desires.currentActivity();

    const updates = activity.tick(world);
    if (updates.coord) {
      this.coord = updates.coord;
    }
    this.sprites = updates.sprites || [];
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
      this.desires.finishCurrentActivity();
      this.desires.startActivity(new DrinkActivity(item, this.character));
    } else {
      uiController.showDialog(new Dialog(this, "Tere, uus rebane!\n\nKüll on tore, et sa meiega liitusid."));
    }
  }
}
