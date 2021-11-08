import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Coord, coordConstrain, coordSub, Rect } from "./Coord";
import { SpriteAnimation } from "./sprites/SpriteAnimation";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { UiController } from "./UiController";
import { BeerGlass, DrinkLevel, isBeerGlass } from "./items/BeerGlass";
import { DrinkAnimation } from "./sprites/DrinkAnimation";
import { Animation } from "./sprites/Animation";
import { PlayerAttributes } from "./attributes/PlayerAttributes";
import { GameKeyEvent } from "./GameEvent";
import { Location } from "./locations/Location";
import { PlayerMovement } from "./PlayerMovement";
import { constrain } from "./utils/constrain";

const MAX_SPEED = 6;

type Facing = 'up' | 'down' | 'left' | 'right';

export class Player implements GameObject {
  private coord: Coord;
  private direction: Coord;
  private speed = 0;
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
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[3, 0]] }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[5, 0]] }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[4, 0]] }),
    }
    this.walkAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [3, 0], to: [3, 0] } }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [5, 0], to: [5, 0] } }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [4, 0], to: [4, 0] } }),
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

  private changeDirection(newDirection: Coord) {
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

  private isStanding(direction: Coord) {
    return direction[0] === 0 && direction[1] === 0;
  }

  private isMoving(direction: Coord) {
    return !this.isStanding(direction);
  }

  private pickByDirection(dir: Coord, options: Record<Facing, SpriteAnimation>): SpriteAnimation {
    return options[this.facing(dir)];
  }

  private facing(dir: Coord): Facing {
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
  }

  private updatePosition(location: Location) {
    if (this.isMoving(this.direction)) {
      this.speed = constrain(this.speed === 0 ? 1 : this.speed * 2, { min: 0, max: MAX_SPEED });
    } else {
      this.speed = 0;
    }
    const newCoord = this.movement.move(this.direction, this.speed, location);

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
    return { coord: [-7, -3], size: [14, 5] };
  }

  // True when the player isn't busy doing something (e.g. drinking)
  isFree(): boolean {
    return !this.itemAtHand;
  }

  isInteractable(ui: UiController) {
    const glass = ui.getSelectedItem();
    return !!glass && isBeerGlass(glass) && glass.getLevel() > DrinkLevel.empty;
  }

  onInteract(ui: UiController) {
    const glass = ui.getSelectedItem();
    if (glass && isBeerGlass(glass) && glass.getLevel() > DrinkLevel.empty) {
      this.itemAtHand = glass;
      this.animation = new DrinkAnimation({
        beerGlass: glass,
        spriteName: "cfe-reb",
        drinkTicks: 10,
        idleTicks: 10,
        onSip: (drink) => {
          ui.getAttributes().drunkenness.sip(drink);
        },
        onFinish: () => {
          this.animation = this.standAnimations.down;
          ui.getAttributes().inventory.add(glass);
          this.itemAtHand = undefined;
        }
      });
      ui.setSelectedItem(undefined);
    }
  }
}
