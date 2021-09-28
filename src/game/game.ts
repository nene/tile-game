import { PixelScreen, PixelScreenOptions } from "./PixelScreen";
import { Player } from "./Player";
import { Background } from "./Background";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./SpriteLibrary";
import { SoundLibrary } from "./SoundLibrary";
import { CfeLocation } from "./CfeLocation";
import { Coord, coordAdd, coordDistance } from "./Coord";
import { UiController } from "./UiController";
import { Loops } from "./Loops";

export interface GameApi {
  onKeyDown: (key: string) => boolean;
  onKeyUp: (key: string) => boolean;
  onClick: (coord: Coord) => void;
  onMouseMove: (coord: Coord) => void;
  onMouseDown: (coord: Coord) => void;
  onMouseUp: (coord: Coord) => void;
  cleanup: () => void;
}

export async function runGame(ctx: CanvasRenderingContext2D, screenCfg: PixelScreenOptions): Promise<GameApi> {
  const screen = new PixelScreen(ctx, screenCfg);
  let screenNeedsRepaint = true;

  await SpriteLibrary.load();
  await SoundLibrary.load();

  const location = new CfeLocation();
  const background = new Background(location.getBackground());

  const world = new GameWorld(location);

  const player = new Player([32, 64]);
  world.add(player);

  const uiController = new UiController(player.getInventory());

  const loops = new Loops();
  loops.runGameLoop(() => {
    world.allObjects().forEach((obj) => obj.tick(world));
    world.sortObjects();
    uiController.tick();
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
      const screenCoord = toPixelScale(coord, screenCfg.scale);
      if (uiController.handleClick(screenCoord)) {
        return; // The click was handled by UI
      }
      const worldCoord = coordAdd(screenCoord, screen.getOffset());
      const obj = world.getObjectVisibleOnCoord(worldCoord);
      if (obj && coordDistance(player.getCoord(), obj.getCoord()) < 16 + 8) {
        obj.onInteract(uiController);
      }
    },
    onMouseMove: (coord: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord = toPixelScale(coord, screenCfg.scale);
      uiController.handleMouseMove(screenCoord);
    },
    onMouseDown: (coord: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord = toPixelScale(coord, screenCfg.scale);
      uiController.handleMouseDown(screenCoord);
    },
    onMouseUp: (coord: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord = toPixelScale(coord, screenCfg.scale);
      uiController.handleMouseUp(screenCoord);
    },
    cleanup: () => {
      loops.cleanup();
    },
  };
}

function toPixelScale([x, y]: Coord, scale: number): Coord {
  return [Math.floor(x / scale), Math.floor(y / scale)];
}
