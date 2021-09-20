import { Coord, coordAdd, coordEq, coordSub, coordUnit } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

export class Bursh implements GameObject {
  private animation: SpriteAnimation;
  private destination?: Coord;
  private path?: Coord[];
  private speed: Coord = [0, 0];

  constructor(sprites: SpriteLibrary, private coord: Coord, type: 0 | 1 | 2) {
    this.animation = new SpriteAnimation(sprites.get("cfe-ksv"), {
      frames: [[type, 0]],
    });
  }

  moveTo(coord: Coord) {
    this.destination = coord;
  }

  tick(world: GameWorld) {
    this.animation.tick();

    if (!this.destination || coordEq(this.coord, this.destination)) {
      this.speed = [0, 0];
      return;
    }

    const targetCoord = this.getActivePathStep(world);
    if (targetCoord) {
      this.speed = coordUnit(coordSub(targetCoord, this.coord));

      this.coord = coordAdd(this.coord, this.speed);
    }
  }

  private getActivePathStep(world: GameWorld): Coord | undefined {
    if (this.destination && !this.path) {
      this.path = world.findPath(this.coord, this.destination);
    }
    const current = this.path?.[0];
    if (current && coordEq(this.coord, current)) {
      return this.path?.shift();
    }
    return current;
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), this.coord);
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

  tileSize(): Coord {
    return [1, 1];
  }
}
