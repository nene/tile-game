import { PixelScreen } from "../PixelScreen";
import { GameObject } from "../GameObject";
import { Coord, coordConstrain, coordSub, Rect } from "../Coord";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { UiController } from "../UiController";
import { BeerGlass, DrinkLevel, isBeerGlass } from "../items/BeerGlass";
import { DrinkAnimation } from "../sprites/DrinkAnimation";
import { Animation } from "../sprites/Animation";
import { GameKeyEvent } from "../GameEvent";
import { Location } from "../locations/Location";
import { PlayerMovement } from "./PlayerMovement";
import { constrain } from "../utils/constrain";
import { GameItem } from "../items/GameItem";
import { PlayerAnimationLibrary } from "./PlayerAnimationLibrary";
import { Facing, PlayerDirection } from "./PlayerDirection";

const MAX_SPEED = 6;

type MentalState = 'sober' | 'drunk' | 'sleep';

export class Player implements GameObject {
  private coord: Coord;
  private speed = 0;
  private animation: Animation;
  private itemAtHand?: BeerGlass;
  private mentalState: MentalState = 'sober';
  private movement = new PlayerMovement(this);
  private animationLib = new PlayerAnimationLibrary();
  private direction: PlayerDirection;

  constructor(coord: Coord) {
    this.coord = coord;
    this.direction = new PlayerDirection({
      onStartMoving: this.startMoving.bind(this),
      onStartStanding: this.startStanding.bind(this),
      onChangeMovingDirection: this.changeMovingDirection.bind(this),
    });

    this.animation = this.animationLib.getStanding(this.direction.getFacing());
  }

  setMentalState(state: MentalState) {
    this.mentalState = state;
    if (this.direction.isStanding() && !this.itemAtHand) {
      this.startStanding("down");
    }
  }

  handleKeyEvent(event: GameKeyEvent): boolean {
    if (this.itemAtHand) {
      return false;
    }
    if (event.type === "keydown") {
      switch (event.key) {
        case "LEFT":
          this.direction.moveInDir("left");
          return true;
        case "RIGHT":
          this.direction.moveInDir("right");
          return true;
        case "UP":
          this.direction.moveInDir("up");
          return true;
        case "DOWN":
          this.direction.moveInDir("down");
          return true;
        default:
          return false; // Inform that we didn't handle the keypress
      }
    } else {
      switch (event.key) {
        case "LEFT":
          this.direction.stopInDir("left");
          return true;
        case "RIGHT":
          this.direction.stopInDir("right");
          return true;
        case "UP":
          this.direction.stopInDir("up");
          return true;
        case "DOWN":
          this.direction.stopInDir("down");
          return true;
        default:
          return false; // Inform that we didn't handle the keypress
      }
    }
  }

  private startMoving(facing: Facing) {
    this.animation = this.animationLib.getWalking(facing);
  }

  private startStanding(facing: Facing) {
    if (this.mentalState === 'drunk') {
      this.animation = this.animationLib.getDrunk();
    } else {
      this.animation = this.animationLib.getStanding(facing);
    }
  }

  private changeMovingDirection(facing: Facing) {
    const frameNr = this.animation instanceof SpriteAnimation ? this.animation.getFrame() : 0;
    this.animation = this.animationLib.getWalking(facing, frameNr);
  }

  tick(location: Location) {
    this.updatePosition(location);
    this.animation.tick();
  }

  private updatePosition(location: Location) {
    if (this.direction.isMoving()) {
      this.speed = constrain(this.speed === 0 ? 1 : this.speed * 2, { min: 0, max: MAX_SPEED });
    } else {
      this.speed = 0;
    }
    const newCoord = this.movement.move(this.direction.getHeading(), this.speed, location);

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

  isInteractable(ui: UiController, glass?: GameItem) {
    return !!glass && isBeerGlass(glass) && glass.getLevel() > DrinkLevel.empty;
  }

  interact(ui: UiController, glass?: GameItem) {
    if (glass && isBeerGlass(glass) && glass.getLevel() > DrinkLevel.empty) {
      this.itemAtHand = glass;
      this.animation = new DrinkAnimation({
        beerGlass: glass,
        spriteName: "cfe-reb",
        drinkTicks: 10,
        idleTicks: 10,
        onSip: (drink) => {
          ui.getAttributes().alcoSkill.sip(drink);
        },
        onFinish: () => {
          this.startStanding("down");

          ui.getAttributes().inventory.add(glass);
          this.itemAtHand = undefined;
        }
      });
      ui.getAttributes().setSelectedItem(undefined);
    }
  }
}
