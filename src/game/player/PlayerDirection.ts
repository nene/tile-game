import { Coord } from "../Coord";

export type Facing = "up" | "down" | "left" | "right";

interface PlayerDirectionEvents {
  onStartMoving: (facing: Facing) => void;
  onStartStanding: (facing: Facing) => void;
  onChangeMovingDirection: (facing: Facing) => void;
}

export class PlayerDirection {
  private heading: Coord = [0, 0];
  private facing: Facing = "down";

  constructor(private events: PlayerDirectionEvents) {
  }

  getHeading(): Coord {
    return this.heading;
  }

  getFacing(): Facing {
    return this.facing;
  }

  setFacing(facing: Facing) {
    this.facing = facing;
  }

  moveInDir(facing: Facing) {
    switch (facing) {
      case "left":
        this.changeDirection([-1, this.heading[1]]);
        break;
      case "right":
        this.changeDirection([1, this.heading[1]]);
        break;
      case "up":
        this.changeDirection([this.heading[0], -1]);
        break;
      case "down":
        this.changeDirection([this.heading[0], 1]);
        break;
    }
  }

  stopInDir(facing: Facing) {
    switch (facing) {
      case "left":
        this.changeDirection([Math.max(0, this.heading[0]), this.heading[1]]);
        break;
      case "right":
        this.changeDirection([Math.min(0, this.heading[0]), this.heading[1]]);
        break;
      case "up":
        this.changeDirection([this.heading[0], Math.max(0, this.heading[1])]);
        break;
      case "down":
        this.changeDirection([this.heading[0], Math.min(0, this.heading[1])]);
        break;
    }
  }

  private changeDirection(newHeading: Coord) {
    const oldHeading = this.heading;
    if (this.isMoving(newHeading)) {
      const oldFacing = this.facing;
      this.facing = this.headingToFacing(newHeading);
      if (this.isStanding(oldHeading)) {
        this.events.onStartMoving(this.facing);
      }
      else if (oldFacing !== this.facing) {
        this.events.onChangeMovingDirection(this.facing);
      }
    } else {
      if (this.isMoving(oldHeading)) {
        this.events.onStartStanding(this.facing);
      }
    }
    this.heading = newHeading;
  }

  isStanding(heading: Coord = this.heading) {
    return heading[0] === 0 && heading[1] === 0;
  }

  isMoving(heading: Coord = this.heading) {
    return !this.isStanding(heading);
  }

  private headingToFacing(heading: Coord): Facing {
    if (heading[0] > 0) {
      return 'right';
    }
    if (heading[0] < 0) {
      return 'left';
    }
    if (heading[1] > 0) {
      return 'down';
    }
    return 'up';
  }
}
