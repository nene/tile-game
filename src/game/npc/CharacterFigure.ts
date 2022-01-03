import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";
import { AkademicCharacter } from "./Character";
import { ActivityManager } from "./ActivityManager";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Location } from "../locations/Location";
import { createCharacterActivities } from "./createCharacterActivities";
import { GameItem } from "../items/GameItem";

export class CharacterFigure implements GameObject {
  private activityManager: ActivityManager;
  private sprites: Sprite[] = [];
  private defaultSprite: Sprite;

  constructor(private coord: Coord, private character: AkademicCharacter) {
    this.activityManager = new ActivityManager(createCharacterActivities(character));
    this.defaultSprite = SpriteLibrary.getSprite(character.getSpriteName());
  }

  getCharacter(): AkademicCharacter {
    return this.character;
  }

  tick(location: Location, world: GameWorld) {
    const activity = this.activityManager.currentActivity();

    const updates = activity.tick(this, location, world);
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
    return { coord: [-8, -2], size: [16, 5] };
  }

  isInteractable(ui: UiController, item?: GameItem) {
    return this.activityManager.currentActivity().isInteractable(ui, item);
  }

  interact(ui: UiController, item?: GameItem) {
    this.activityManager.currentActivity().interact(ui, item);
  }
}

export const isCharacterFigure = (obj: GameObject): obj is CharacterFigure => obj instanceof CharacterFigure;
