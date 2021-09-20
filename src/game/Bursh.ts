import { Coord, coordAdd, coordEq, coordSub, coordUnit } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

export class Bursh implements GameObject {
  private animation: SpriteAnimation;
  private destination?: Coord;
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

    this.speed = coordUnit(coordSub(this.destination, this.coord));

    this.coord = coordAdd(this.coord, this.speed);
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
    return true;
  }

  tileSize(): Coord {
    return [1, 1];
  }
}
