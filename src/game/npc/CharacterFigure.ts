import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";
import { Character } from "./Character";
import { Desires } from "./Desires";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class CharacterFigure implements GameObject {
  private desires: Desires;
  private sprites: Sprite[] = [];
  private defaultSprite: Sprite;

  constructor(private coord: Coord, private character: Character) {
    this.desires = new Desires(character);
    this.defaultSprite = SpriteLibrary.get(character.spriteSet).getSprite([0, 0]);
  }

  tick(world: GameWorld) {
    const activity = this.desires.currentActivity();

    const updates = activity.tick(this, world);
    if (updates.coord) {
      this.coord = updates.coord;
    }
    this.sprites = updates.sprites || [];
  }

  paint(screen: PixelScreen) {
    if (this.sprites.length === 0) {
      screen.drawSprite(this.defaultSprite, this.coord);
      return;
    }

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
    const activity = this.desires.currentActivity();
    activity.interact(uiController);
  }
}
