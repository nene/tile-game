import { Coord, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { BeerBottle } from "./items/BeerBottle";
import { PixelScreen } from "./PixelScreen";
import { Player } from "./Player";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";

export class Fridge implements GameObject {
  private sprite: Sprite;

  constructor(private coord: Coord, private sprites: SpriteLibrary) {
    this.sprite = sprites.get("fridge").getSprite([0, 0]);
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
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

  hitBox(): Rect {
    return { coord: [0, -32], size: [16, 45] };
  }

  onInteract(player: Player) {
    player.getInventory().add(new BeerBottle(Math.floor(Math.random() * 3), this.sprites));
  }
}
