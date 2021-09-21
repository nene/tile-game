import { Coord, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { Activity, MoveActivity } from "./MoveActivity";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

interface BurshConfig {
  spriteType: 0 | 1 | 2;
  name: string;
}

export class Bursh implements GameObject {
  private animation: SpriteAnimation;
  private name: string;
  private actions: Activity[] = [];

  constructor(private coord: Coord, sprites: SpriteLibrary, cfg: BurshConfig) {
    this.name = cfg.name;
    this.animation = new SpriteAnimation(sprites.get("cfe-ksv"), {
      frames: [[cfg.spriteType, 0]],
    });
  }

  moveTo(destination: Coord) {
    this.actions.push(new MoveActivity(this.coord, destination));
  }

  tick(world: GameWorld) {
    // run actions in queue
    if (this.actions.length > 0) {
      const action = this.actions[0];
      const updates = action.tick(world);
      if (updates.coord) {
        this.coord = updates.coord;
      }
      if (updates.finished) {
        this.actions.shift();
      }
    }

    this.animation.tick();
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
