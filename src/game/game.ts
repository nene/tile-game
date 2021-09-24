import { PixelScreen } from "./PixelScreen";
import { Player } from "./Player";
import { Background } from "./Background";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./SpriteLibrary";
import { SoundLibrary } from "./SoundLibrary";
import { CfeLocation } from "./CfeLocation";
import { Coord, coordAdd, coordDistance } from "./Coord";
import { UiController } from "./UiController";
import { Loops } from "./Loops";

const PIXEL_SCALE = 4;

export interface GameApi {
  onKeyDown: (key: string) => boolean;
  onKeyUp: (key: string) => boolean;
  onClick: (coord: Coord) => void;
  onHover: (coord: Coord) => void;
  cleanup: () => void;
}

export async function runGame(ctx: CanvasRenderingContext2D): Promise<GameApi> {
  const screen = new PixelScreen(ctx, { width: 320, height: 200, scale: PIXEL_SCALE });
  let screenNeedsRepaint = true;

  const sprites = new SpriteLibrary();
  await sprites.load();
  const sounds = new SoundLibrary();
  await sounds.load();

  const location = new CfeLocation(sprites);
  const background = new Background(location.getBackground());

  const world = new GameWorld(location);

  const player = new Player(sprites, [32, 64]);
  world.add(player);

  const uiController = new UiController(player.getInventory(), sprites);

  const loops = new Loops();
  loops.runGameLoop(() => {
    world.allObjects().forEach((obj) => obj.tick(world));
    world.sortObjects();
    screenNeedsRepaint = true;
  });

  loops.runPaintLoop(() => {
    if (!screenNeedsRepaint) {
      return; // Don't paint when app state hasn't changed
    }
    screen.centerTo(player.getCoord(), world);
    background.paint(screen);
    world.allObjects().forEach((obj) => obj.paint(screen));
    uiController.paint(screen);
    screenNeedsRepaint = false;
  });

  return {
    onKeyDown: (key: string): boolean => {
      screenNeedsRepaint = true;
      return player.handleKeyDown(key);
    },
    onKeyUp: (key: string): boolean => {
      screenNeedsRepaint = true;
      return player.handleKeyUp(key);
    },
    onClick: (coord: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord = toPixelScale(coord);
      if (uiController.handleClick(screenCoord)) {
        return; // The click was handled by UI
      }
      const worldCoord = coordAdd(screenCoord, screen.getOffset());
      const obj = world.getObjectVisibleOnCoord(worldCoord);
      if (obj && coordDistance(player.getCoord(), obj.getCoord()) < 16 + 8) {
        obj.onInteract(uiController);
      }
    },
    onHover: (coord: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord = toPixelScale(coord);
      if (uiController.handleHover(screenCoord)) {
        return; // The click was handled by UI
      }
    },
    cleanup: () => {
      loops.cleanup();
    },
  };
}

function toPixelScale([x, y]: Coord): Coord {
  return [Math.floor(x / PIXEL_SCALE), Math.floor(y / PIXEL_SCALE)];
}
