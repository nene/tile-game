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
  onKeyEvent: (type: "keyup" | "keydown", key: string) => boolean;
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

  const player = new Player([286, 113]);
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

  function canInteractWithWorld(): boolean {
    const worldCoord = coordAdd(uiController.getMouseCoord(), screen.getOffset());
    const obj = world.getObjectVisibleOnCoord(worldCoord);
    return Boolean(obj && isObjectsCloseby(player, obj) && obj.isInteractable(uiController));
  }

  const eventFactory = new GameEventFactory(screenCfg.scale);

  return {
    onKeyEvent: (type: "keyup" | "keydown", key: string): boolean => {
      const event = eventFactory.createKeyboardEvent(type, key);
      if (uiController.isGameWorldActive() && uiController.isGameWorldVisible()) {
        const result = player.handleKeyEvent(event);
        uiController.highlightCursor(canInteractWithWorld());
        screenNeedsRepaint = true;
        return result;
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
      }
      else if (type === "mousemove") {
        uiController.handleGameEvent(event);
        if (uiController.isGameWorldActive() && uiController.isGameWorldVisible()) {
          uiController.highlightCursor(canInteractWithWorld());
        } else {
          uiController.highlightCursor(false);
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
