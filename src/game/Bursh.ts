import { Coord, coordAdd, coordEq, coordMul, coordSub, coordUnit, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

interface BurshConfig {
  spriteType: 0 | 1 | 2;
  name: string;
}

export class Bursh implements GameObject {
  private animation: SpriteAnimation;
  private destination?: Coord;
  private path?: Coord[];
  private speed: Coord = [0, 0];
  private name: string;

  constructor(private coord: Coord, sprites: SpriteLibrary, cfg: BurshConfig) {
    this.name = cfg.name;
    this.animation = new SpriteAnimation(sprites.get("cfe-ksv"), {
      frames: [[cfg.spriteType, 0]],
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
      this.speed = coordMul(coordUnit(coordSub(targetCoord, this.coord)), [2, 2]);

      this.coord = coordAdd(this.coord, this.speed);
    }
  }

  private getActivePathStep(world: GameWorld): Coord | undefined {
    if (this.destination && !this.path) {
      this.path = world.findPath(this.coord, this.destination);
    }
    const current = this.path?.[0];
    if (current && coordEq(this.coord, current)) {
      this.path?.shift();
      return this.path?.[0];
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

  hitBox(): Rect {
    return { coord: [-7, -29], size: [14, 30] };
  }

  onInteract() {
    console.log("You talked to " + this.name);
  }
}
