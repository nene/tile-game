import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { UiController } from "../UiController";
import { ActivityManager } from "./ActivityManager";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Location } from "../locations/Location";
import { GameItem } from "../items/GameItem";
import { Character } from "./Character";
import { Table } from "../furniture/Table";

export class CharacterFigure implements GameObject {
  private activityManager: ActivityManager;
  private sprites: Sprite[] = [];
  private defaultSprite: Sprite;
  private table?: Table;

  constructor(private coord: Coord, private character: Character) {
    this.activityManager = new ActivityManager(character.getActivities());
    this.defaultSprite = SpriteLibrary.getSprite(character.getSpriteName());
  }

  getCharacter(): Character {
    return this.character;
  }

  tick(location: Location, world: GameWorld) {
    const activity = this.activityManager.currentActivity();

    const updates = activity.tick(this, location, world);
    if (updates.coord) {
      this.coord = updates.coord;
    }
    this.sprites = updates.sprites || [this.defaultSprite];
  }

  paint(screen: PixelScreen) {
    screen.drawSprites(this.sprites, this.coord);
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

  sitAtTable(table: Table | undefined) {
    this.table = table;
  }

  getTable(): Table | undefined {
    return this.table;
  }
}

export const isCharacterFigure = (obj: GameObject): obj is CharacterFigure => obj instanceof CharacterFigure;
