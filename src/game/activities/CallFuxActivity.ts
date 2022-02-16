import { Coord, coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { UiApi } from "../UiController";
import { Interaction } from "./interactions/Interaction";
import { GameItem } from "../items/GameItem";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Location } from "../locations/Location";
import { GameWorld } from "../GameWorld";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprites: Sprite[];

  constructor(character: AcademicCharacter, private interaction: Interaction) {
    this.sprite = character.getGraphics().getDefaultSprite();
    this.calloutSprites = interaction.getCalloutSprites();
  }

  tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
    if (this.interaction.tryComplete(figure, location, world)) {
      return {};
    }

    this.counter++;
    return {
      sprites: [
        this.sprite,
        ...this.calloutSprites.map((sprite) => this.translateSprite(sprite, this.spriteOffset()))
      ],
    };
  }

  private translateSprite(sprite: Sprite, offset: Coord): Sprite {
    return {
      ...sprite,
      offset: coordAdd(sprite.offset, offset),
    };
  }

  private spriteOffset(): Coord {
    const sinX = Math.sin(Math.PI * ((this.counter % 11) / 10));
    return [0, sinX * 4];
  }

  isFinished() {
    return this.interaction.isFinished();
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiApi, item?: GameItem) {
    this.interaction.interact(ui, item);
  }

  nextActivity() {
    if (this.interaction.isFinished()) {
      return this.interaction.nextActivity();
    }
  }
}
