import { Skill } from "../attributes/Skill";
import { Coord, coordAdd, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen, TextStyle } from "../PixelScreen";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Component } from "./Component";
import levelUpJson from "../sprites/data/level-up.json";
import { Sprite } from "../sprites/Sprite";
import { debounce } from "lodash";

const TEXT_COLOR = "#3e2821";
const BG_COLOR = "#c8b997";

const POSITION: Coord = [12, 7];
const INDENT: Coord = [6, 0];
const PADDING: Coord = [3, 1];
const BORDER_PADDING: Coord = [4, 2];

export class LevelUpMessage implements Component {
  private message?: { icon: Sprite, text: string };
  private animation = new SpriteAnimation(SpriteLibrary.get("level-up"), {
    frames: readAsepriteAnimation("bounce", levelUpJson),
  });

  private hideMessageAfterDelay = debounce(() => {
    this.message = undefined;
  }, 10000);

  onLevelUp(skill: Skill, text: string) {
    this.message = {
      icon: skill.getIcon(),
      text,
    };
    this.hideMessageAfterDelay();
  }

  handleGameEvent(event: GameEvent) {
    return undefined;
  };

  tick() {
    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    if (!this.message) {
      return;
    }

    const style: TextStyle = { color: TEXT_COLOR, size: "small" };
    const textSize = coordAdd(screen.measureText(this.message.text, style), INDENT);

    const borderRect = rectGrow({ coord: POSITION, size: textSize }, BORDER_PADDING);
    screen.drawRect(borderRect, TEXT_COLOR);
    screen.drawRect(rectGrow({ coord: POSITION, size: textSize }, PADDING), BG_COLOR);
    screen.drawText(this.message.text, coordAdd(POSITION, INDENT), style);

    screen.drawSprite(this.message.icon, coordAdd(borderRect.coord, [-6, -1]));
    screen.drawSprites(this.animation.getSprites(), coordAdd(borderRect.coord, [1, -3]));
  }
}
