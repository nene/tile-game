import { PixelScreen, PixelScreenOptions } from "./PixelScreen";
import { Player } from "./Player";
import { Background } from "./Background";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { SoundLibrary } from "./sounds/SoundLibrary";
import { CfeLocation } from "./CfeLocation";
import { Coord, coordAdd, Rect, rectDistance, rectTranslate } from "./Coord";
import { UiController } from "./UiController";
import { Loops } from "./Loops";
import { GameObject } from "./GameObject";
import { FpsCounter } from "./FpsCounter";
import { GameEventFactory, GameEventType } from "./GameEvent";

export interface GameApi {
  onKeyDown: (key: string) => boolean;
  onKeyUp: (key: string) => boolean;
  onMouseEvent: (type: GameEventType, coord: Coord, wheelDelta?: Coord) => void;
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

  const uiController = new UiController(player.getAttributes());

  const loops = new Loops();
  loops.runGameLoop(() => {
    if (uiController.isGameWorldActive()) {
      world.allObjects().forEach((obj) => obj.tick(world));
      world.sortObjects();
    }
    uiController.tick();
    screenNeedsRepaint = true;
  });

  const fps = new FpsCounter();
  loops.runPaintLoop(() => {
    fps.countFrame();
    if (!screenNeedsRepaint) {
      return; // Don't paint when app state hasn't changed
    }
    if (uiController.isGameWorldVisible()) {
      screen.centerTo(player.getCoord(), world);
      background.paint(screen);
      world.allObjects().forEach((obj) => obj.paint(screen));
    }
    uiController.paint(screen);
    fps.paint(screen);
    screenNeedsRepaint = false;
  });

  function handleWorldClick(worldCoord: Coord) {
    const obj = world.getObjectVisibleOnCoord(worldCoord);
    if (obj && isObjectsCloseby(player, obj)) {
      obj.onInteract(uiController);
    }
  }

  const eventFactory = new GameEventFactory(screenCfg.scale);

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
    onMouseEvent: (type: GameEventType, coord: Coord, wheelDelta?: Coord) => {
      screenNeedsRepaint = true;
      const event = eventFactory.createEvent(type, coord, wheelDelta);
      if (type === "click") {
        if (!uiController.handleGameEvent(event)) {
          // When the click was not handled by UI
          handleWorldClick(coordAdd(event.coord, screen.getOffset()));
        }
      } else {
        uiController.handleGameEvent(event);
      }
    },
    cleanup: () => {
      loops.cleanup();
    },
  };
}

function isObjectsCloseby(obj1: GameObject, obj2: GameObject) {
  return rectDistance(objectBounds(obj1), objectBounds(obj2)) < 5;
}

function objectBounds(obj: GameObject): Rect {
  return rectTranslate(obj.boundingBox(), obj.getCoord());
}
