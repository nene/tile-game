import { Activity, ActivityUpdates } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { UiController } from "../UiController";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { CallFuxActivity } from "./CallFuxActivity";
import { CharacterFigure } from "../npc/CharacterFigure";
import { GameItem } from "../items/GameItem";
import { EmptyBottlesInteraction } from "./interactions/EmptyBottlesInteraction";
import { Interaction } from "./interactions/Interaction";
import { OceanInteraction } from "./interactions/OceanInteraction";

export type AnnoyanceType = "ocean" | "empty-bottles";

interface Annoyance {
  type: AnnoyanceType;
  activity: Activity;
}

export class AvoidAnnoyancesActivity implements Activity {
  private finished = false;
  private annoyance?: Annoyance;

  constructor(private character: AcademicCharacter, private innerActivity: Activity) {
  }

  tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
    const annoyanceType = this.character.getAnnoyance();
    if (annoyanceType) {
      if (!this.annoyance) {
        this.annoyance = {
          type: annoyanceType,
          activity: new CallFuxActivity(this.character, this.createAnnoyanceInteraction(annoyanceType)),
        };
      }
      const result = this.annoyance.activity.tick(figure, location, world);
      if (this.annoyance.activity.isFinished()) {
        this.annoyance = undefined;
      }
      return result;
    } else {
      this.annoyance = undefined;
    }
    return this.innerActivity.tick(figure, location, world);
  }

  private createAnnoyanceInteraction(type: AnnoyanceType): Interaction {
    switch (type) {
      case "empty-bottles": return new EmptyBottlesInteraction(this.character);
      case "ocean": return new OceanInteraction(this.character);
    }
  }

  isFinished() {
    return this.innerActivity.isFinished();
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController, item?: GameItem) {
    if (this.annoyance) {
      return this.annoyance.activity.interact(ui, item);
    }
    this.innerActivity.interact(ui, item);
  }

  nextActivity() {
    return this.innerActivity.nextActivity();
  }
}
