import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { UiApi } from "../UiController";
import { Location } from "../locations/Location";
import { GameItem } from "../items/GameItem";
import { Character } from "./Character";

export class CharacterFigure implements GameObject {
  private sprites: Sprite[] = [];
  private defaultSprite: Sprite;

  constructor(private coord: Coord, private character: Character) {
    this.defaultSprite = character.getGraphics().getDefaultSprite();
  }

  getCharacter(): Character {
    return this.character;
  }

  tick(location: Location, world: GameWorld) {
    const activity = this.character.currentActivity();

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

  isInteractable(ui: UiApi, item?: GameItem) {
    return this.character.currentActivity().isInteractable(ui, item);
  }

  interact(ui: UiApi, item?: GameItem) {
    this.character.currentActivity().interact(ui, item);
  }
}

export const isCharacterFigure = (obj: GameObject): obj is CharacterFigure => obj instanceof CharacterFigure;
