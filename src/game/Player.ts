import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Coord, coordAdd, coordConstrain, coordSub, Rect, rectTranslate } from "./Coord";
import { SpriteAnimation } from "./sprites/SpriteAnimation";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { StorageInventory } from "./inventory/StorageInventory";
import { BottleOpener } from "./items/BottleOpener";
import { UiController } from "./UiController";
import { BeerGlass, BeerLevel } from "./items/BeerGlass";
import { DrinkAnimation } from "./sprites/DrinkAnimation";
import { Animation } from "./sprites/Animation";
import { GameItem } from "./items/GameItem";

const max = Math.max;
const min = Math.min;

type Direction = 'up' | 'down' | 'left' | 'right';

export class Player implements GameObject {
  private coord: Coord;
  private speed: Coord;
  private standRight: SpriteAnimation;
  private standLeft: SpriteAnimation;
  private standBack: SpriteAnimation;
  private standForward: SpriteAnimation;
  private walkRight: SpriteAnimation;
  private walkLeft: SpriteAnimation;
  private walkBack: SpriteAnimation;
  private walkForward: SpriteAnimation;
  private animation: Animation;
  private itemAtHand?: GameItem;
  private inventory = new StorageInventory({ size: 5 });

  constructor(coord: Coord) {
    this.coord = coord;
    this.speed = [0, 0];

    this.standForward = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] });
    this.standBack = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] });
    this.standRight = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] });
    this.standLeft = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] });

    this.walkForward = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } });
    this.walkBack = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } });
    this.walkRight = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } });
    this.walkLeft = new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } });

    this.animation = this.standRight;

    this.inventory.placeAt(0, new BottleOpener());
  }

  getInventory() {
    return this.inventory;
  }

  handleKeyDown(key: string): boolean {
    if (this.itemAtHand) {
      return false;
    }
    switch (key) {
      case "ArrowLeft":
        this.changeSpeed([-3, this.speed[1]]);
        return true;
      case "ArrowRight":
        this.changeSpeed([3, this.speed[1]]);
        return true;
      case "ArrowUp":
        this.changeSpeed([this.speed[0], -3]);
        return true;
      case "ArrowDown":
        this.changeSpeed([this.speed[0], 3]);
        return true;
      default:
        return false; // Inform that we didn't handle the keypress
    }
  }

  handleKeyUp(key: string): boolean {
    if (this.itemAtHand) {
      return false;
    }
    switch (key) {
      case "ArrowLeft":
        this.changeSpeed([max(0, this.speed[0]), this.speed[1]]);
        return true;
      case "ArrowRight":
        this.changeSpeed([min(0, this.speed[0]), this.speed[1]]);
        return true;
      case "ArrowUp":
        this.changeSpeed([this.speed[0], max(0, this.speed[1])]);
        return true;
      case "ArrowDown":
        this.changeSpeed([this.speed[0], min(0, this.speed[1])]);
        return true;
      default:
        return false; // Inform that we didn't handle the keypress
    }
  }

  changeSpeed(newSpeed: Coord) {
    const oldSpeed = this.speed;
    if (this.isMoving(newSpeed)) {
      const oldAnimation = this.animation;
      this.animation = this.pickByDirection(newSpeed, {
        right: this.walkRight,
        left: this.walkLeft,
        up: this.walkBack,
        down: this.walkForward,
      });
      // A hack for now...
      if (this.animation instanceof SpriteAnimation && oldAnimation instanceof SpriteAnimation) {
        if (this.isStanding(oldSpeed)) {
          // started moving, begin new animation
          this.animation.setFrame(0);
        } else {
          // was already moving, preserve current animation frame
          this.animation.setFrame(oldAnimation.getFrame());
        }
      }
    }
    else {
      if (this.isMoving(oldSpeed)) {
        // was moving, now stopped
        this.animation = this.pickByDirection(oldSpeed, {
          right: this.standRight,
          left: this.standLeft,
          up: this.standBack,
          down: this.standForward,
        });
      }
    }
    this.speed = newSpeed;
  }

  isStanding(speed: Coord) {
    return speed[0] === 0 && speed[1] === 0;
  }

  isMoving(speed: Coord) {
    return !this.isStanding(speed);
  }

  pickByDirection(speed: Coord, options: Record<Direction, SpriteAnimation>): SpriteAnimation {
    return options[this.lookingDirection(speed)];
  }

  lookingDirection(speed: Coord): Direction {
    if (speed[0] > 0) {
      return 'right';
    }
    if (speed[0] < 0) {
      return 'left';
    }
    if (speed[1] > 0) {
      return 'down';
    }
    return 'up';
  }

  tick(world: GameWorld) {
    this.updatePosition(world);
    this.animation.tick();

    this.maybeFinishDrinking();
  }

  private updatePosition(world: GameWorld) {
    const newCoord = coordAdd(this.coord, this.speed);
    const bounds = rectTranslate(this.boundingBox(), newCoord);

    if (world.getObjectsInRect(bounds).some((obj) => obj.isSolid() && obj !== this)) {
      return; // Don't move through walls
    }

    this.coord = this.constrainToWorld(newCoord, world);
  }

  private constrainToWorld(coord: Coord, world: GameWorld): Coord {
    const bounds = this.boundingBox();
    return coordConstrain(coord, { coord: coordSub([0, 0], bounds.coord), size: coordSub(world.size(), bounds.size) });
  }

  paint(screen: PixelScreen) {
    this.animation.getSprites().forEach((sprite) => {
      screen.drawSprite(sprite, this.coord);
    });
  }

  zIndex(): number {
    return this.coord[1];
  }

  getCoord(): Coord {
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

  onInteract(ui: UiController) {
    const glass = ui.getSelectedItem();
    if (glass instanceof BeerGlass && glass.getLevel() > BeerLevel.empty) {
      this.itemAtHand = glass;
      this.animation = new DrinkAnimation(glass, "cfe-reb");
      ui.removeSelectedItem();
    }
  }

  private maybeFinishDrinking() {
    if (this.itemAtHand && this.animation.isFinished()) {
      this.animation = this.standForward;
      this.inventory.add(this.itemAtHand);
      this.itemAtHand = undefined;
    }
  }
}
