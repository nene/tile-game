import { CallFuxActivity } from "./activities/CallFuxActivity";
import { Coord, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { Activity } from "./activities/Activity";
import { MoveActivity } from "./activities/MoveActivity";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

interface BurshConfig {
  spriteType: 0 | 1 | 2;
  name: string;
}

export class Bursh implements GameObject {
  private animation: SpriteAnimation;
  private name: string;
  private activities: Activity[] = [];
  private extraSprite?: Sprite;

  constructor(private coord: Coord, private sprites: SpriteLibrary, cfg: BurshConfig) {
    this.name = cfg.name;
    this.animation = new SpriteAnimation(sprites.get("cfe-ksv"), {
      frames: [[cfg.spriteType, 0]],
    });
  }

  moveTo(destination: Coord) {
    this.activities.push(new MoveActivity(this.coord, destination));
    this.activities.push(new CallFuxActivity(this.sprites));
  }

  tick(world: GameWorld) {
    // run activities in queue
    if (this.activities.length > 0) {
      const activity = this.activities[0];
      const updates = activity.tick(world);
      if (updates.coord) {
        this.coord = updates.coord;
      }
      this.extraSprite = updates.extraSprite;
      if (updates.finished) {
        this.activities.shift();
      }
    }

    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), this.coord);
    if (this.extraSprite) {
      screen.drawSprite(this.extraSprite, this.coord);
    }
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
