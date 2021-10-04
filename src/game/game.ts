import { PixelScreen, PixelScreenOptions } from "./PixelScreen";
import { Player } from "./Player";
import { Background } from "./Background";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./SpriteLibrary";
import { SoundLibrary } from "./SoundLibrary";
import { CfeLocation } from "./CfeLocation";
import { Coord, coordAdd, Rect, rectDistance, rectTranslate } from "./Coord";
import { UiController } from "./UiController";
import { Loops } from "./Loops";
import { GameObject } from "./GameObject";

export interface GameApi {
  onKeyDown: (key: string) => boolean;
  onKeyUp: (key: string) => boolean;
  onClick: (coord: Coord) => void;
  onMouseMove: (coord: Coord) => void;
  onMouseDown: (coord: Coord) => void;
  onMouseUp: (coord: Coord) => void;
  onWheel: (coord: Coord, wheelDelta: Coord) => void;
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

  const player = new Player([36, 64]);
  world.add(player);

  const uiController = new UiController(player.getInventory());

  const loops = new Loops();
  loops.runGameLoop(() => {
    if (uiController.isGameWorldActive()) {
      world.allObjects().forEach((obj) => obj.tick(world));
      world.sortObjects();
    }
    uiController.tick();
    screenNeedsRepaint = true;
  });

  loops.runPaintLoop(() => {
    if (!screenNeedsRepaint) {
      return; // Don't paint when app state hasn't changed
    }
    if (uiController.isGameWorldVisible()) {
      screen.centerTo(player.getCoord(), world);
      background.paint(screen);
      world.allObjects().forEach((obj) => obj.paint(screen));
    }
    uiController.paint(screen);
    screenNeedsRepaint = false;
  });

  return {
    onKeyDown: (key: string): boolean => {
      if (uiController.isGameWorldActive() && uiController.isGameWorldVisible()) {
        screenNeedsRepaint = true;
        return player.handleKeyDown(key);
      }
      return false;
    },
    onKeyUp: (key: string): boolean => {
      if (uiController.isGameWorldActive() && uiController.isGameWorldVisible()) {
        screenNeedsRepaint = true;
        return player.handleKeyUp(key);
      }
      return false;
    },
    onClick: (coord: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord = toPixelScale(coord, screenCfg.scale);
      if (uiController.handleClick(screenCoord)) {
        return; // The click was handled by UI
      }
      const worldCoord = coordAdd(screenCoord, screen.getOffset());
      const obj = world.getObjectVisibleOnCoord(worldCoord);
      if (obj && isObjectsCloseby(player, obj)) {
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
    onWheel: (coord: Coord, wheelDelta: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord = toPixelScale(coord, screenCfg.scale);
      uiController.handleWheel(screenCoord, wheelDelta);
    },
    cleanup: () => {
      loops.cleanup();
    },
  };
}

function toPixelScale([x, y]: Coord, scale: number): Coord {
  return [Math.floor(x / scale), Math.floor(y / scale)];
}

function isObjectsCloseby(obj1: GameObject, obj2: GameObject) {
  return rectDistance(objectBounds(obj1), objectBounds(obj2)) < 5;
}

function objectBounds(obj: GameObject): Rect {
  return rectTranslate(obj.boundingBox(), obj.getCoord());
}
