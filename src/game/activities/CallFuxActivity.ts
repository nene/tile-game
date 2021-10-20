import { Coord, coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { Interaction } from "./Interaction";
import { GameWorld } from "../GameWorld";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprite: Sprite;
  private finished = false;

  constructor(private character: Character, private interaction: Interaction) {
    this.sprite = SpriteLibrary.getSprite(character.spriteSet);
    this.calloutSprite = SpriteLibrary.getSprite("callout");
  }

  tick(): ActivityUpdates {
    this.counter++;
    return {
      sprites: [
        this.sprite,
        this.translateSprite(this.calloutSprite, this.spriteOffset())
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
    return this.finished;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController, world: GameWorld) {
    this.finished = true;
    this.interaction.interact(ui, world);
  }

  nextActivity() {
    if (this.finished) {
      return this.interaction.nextActivity();
    }
  }
}
