import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Coord, coordConstrain, coordSub, Rect } from "./Coord";
import { SpriteAnimation } from "./sprites/SpriteAnimation";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { UiController } from "./UiController";
import { BeerGlass, DrinkLevel } from "./items/BeerGlass";
import { DrinkAnimation } from "./sprites/DrinkAnimation";
import { Animation } from "./sprites/Animation";
import { PlayerAttributes } from "./PlayerAttributes";
import { GameKeyEvent } from "./GameEvent";
import { Location } from "./locations/Location";
import { PlayerMovement } from "./PlayerMovement";
import { GameWorld } from "./GameWorld";

const PLAYER_SPEED = 3;

type Facing = 'up' | 'down' | 'left' | 'right';

export class Player implements GameObject {
  private coord: Coord;
  private direction: Coord;
  private standAnimations: Record<Facing, SpriteAnimation>;
  private walkAnimations: Record<Facing, SpriteAnimation>;
  private animation: Animation;
  private itemAtHand?: BeerGlass;
  private attributes = new PlayerAttributes();
  private movement = new PlayerMovement(this);

  constructor(coord: Coord) {
    this.coord = coord;
    this.direction = [0, 0];

    this.standAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] }),
    }
    this.walkAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } }),
    };

    this.animation = this.standAnimations.down;
  }

  getAttributes(): PlayerAttributes {
    return this.attributes;
  }

  handleKeyEvent(event: GameKeyEvent): boolean {
    if (this.itemAtHand) {
      return false;
    }
    if (event.type === "keydown") {
      switch (event.key) {
        case "LEFT":
          this.changeDirection([-1, this.direction[1]]);
          return true;
        case "RIGHT":
          this.changeDirection([1, this.direction[1]]);
          return true;
        case "UP":
          this.changeDirection([this.direction[0], -1]);
          return true;
        case "DOWN":
          this.changeDirection([this.direction[0], 1]);
          return true;
        default:
          return false; // Inform that we didn't handle the keypress
      }
    } else {
      switch (event.key) {
        case "LEFT":
          this.changeDirection([Math.max(0, this.direction[0]), this.direction[1]]);
          return true;
        case "RIGHT":
          this.changeDirection([Math.min(0, this.direction[0]), this.direction[1]]);
          return true;
        case "UP":
          this.changeDirection([this.direction[0], Math.max(0, this.direction[1])]);
          return true;
        case "DOWN":
          this.changeDirection([this.direction[0], Math.min(0, this.direction[1])]);
          return true;
        default:
          return false; // Inform that we didn't handle the keypress
      }
    }
  }

  changeDirection(newDirection: Coord) {
    const oldDirection = this.direction;
    if (this.isMoving(newDirection)) {
      const oldAnimation = this.animation;
      this.animation = this.pickByDirection(newDirection, this.walkAnimations);
      // A hack for now...
      if (this.animation instanceof SpriteAnimation && oldAnimation instanceof SpriteAnimation) {
        if (this.isStanding(oldDirection)) {
          // started moving, begin new animation
          this.animation.setFrame(0);
        } else {
          // was already moving, preserve current animation frame
          this.animation.setFrame(oldAnimation.getFrame());
        }
      }
    }
    else {
      if (this.isMoving(oldDirection)) {
        // was moving, now stopped
        this.animation = this.pickByDirection(oldDirection, this.standAnimations);
      }
    }
    this.direction = newDirection;
  }

  isStanding(direction: Coord) {
    return direction[0] === 0 && direction[1] === 0;
  }

  isMoving(direction: Coord) {
    return !this.isStanding(direction);
  }

  pickByDirection(dir: Coord, options: Record<Facing, SpriteAnimation>): SpriteAnimation {
    return options[this.facing(dir)];
  }

  facing(dir: Coord): Facing {
    if (dir[0] > 0) {
      return 'right';
    }
    if (dir[0] < 0) {
      return 'left';
    }
    if (dir[1] > 0) {
      return 'down';
    }
    return 'up';
  }

  tick(location: Location) {
    this.updatePosition(location);
    this.animation.tick();

    this.maybeFinishDrinking();
  }

  private updatePosition(location: Location) {
    const newCoord = this.movement.move(this.direction, PLAYER_SPEED, location);

    this.coord = this.constrainToWorld(newCoord, location);
  }

  private constrainToWorld(coord: Coord, location: Location): Coord {
    const bounds = this.boundingBox();
    return coordConstrain(coord, { coord: coordSub([0, 0], bounds.coord), size: coordSub(location.getSize(), bounds.size) });
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

  setCoord(coord: Coord) {
    this.coord = coord;
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

  isInteractable(ui: UiController) {
    const glass = ui.getSelectedItem();
    return glass instanceof BeerGlass && glass.getLevel() > DrinkLevel.empty;
  }

  onInteract(ui: UiController, world: GameWorld) {
    const glass = ui.getSelectedItem();
    if (glass instanceof BeerGlass && glass.getLevel() > DrinkLevel.empty) {
      this.itemAtHand = glass;
      this.animation = new DrinkAnimation(glass, "cfe-reb", (drink) => {
        this.attributes.drunkenness.sip(drink);
      });
      ui.setSelectedItem(undefined);
    }
  }

  private maybeFinishDrinking() {
    if (this.itemAtHand && this.animation.isFinished()) {
      this.animation = this.standAnimations.down;
      this.attributes.inventory.add(this.itemAtHand);
      this.itemAtHand = undefined;
    }
  }
}
