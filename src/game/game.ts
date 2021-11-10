import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./sprites/SpriteLibrary";
import { SoundLibrary } from "./sounds/SoundLibrary";
import { Coord, coordAdd, Rect, rectDistance, rectTranslate } from "./Coord";
import { UiController } from "./UiController";
import { Loops } from "./Loops";
import { GameObject } from "./GameObject";
import { FpsCounter } from "./FpsCounter";
import { GameEventFactory, GameEventType } from "./GameEvent";
import { getAllCharacters } from "./npc/Character";
import { OpinionsView } from "./npc/OpinionsView";
import { SkillsView } from "./attributes/SkillsView";

export interface GameApi {
  onKeyEvent: (type: "keyup" | "keydown", key: string) => boolean;
  onMouseEvent: (type: GameEventType, coord: Coord, wheelDelta?: Coord) => void;
  cleanup: () => void;
}

export async function runGame(ctx: CanvasRenderingContext2D): Promise<GameApi> {
  const screen = new PixelScreen(ctx);
  let screenNeedsRepaint = true;

  await SpriteLibrary.load();
  await SoundLibrary.load();

  const ui = new UiController();

  const loops = new Loops();
  loops.runGameLoop(() => {
    ui.tick();
    screenNeedsRepaint = true;
  });

  const fps = new FpsCounter();
  loops.runPaintLoop(() => {
    fps.countFrame();
    if (!screenNeedsRepaint) {
      return; // Don't paint when app state hasn't changed
    }
    ui.paint(screen);
    fps.paint(screen);
    screenNeedsRepaint = false;
  });

  function toWorldCoord(screenCoord: Coord): Coord {
    return coordAdd(screenCoord, screen.getOffset());
  }

  function handleWorldClick(worldCoord: Coord) {
    const obj = ui.getWorld().getActiveLocation().getObjectVisibleOnCoord(worldCoord);
    const player = ui.getWorld().getPlayer();
    if (obj && isObjectsCloseby(player, obj) && player.isFree()) {
      obj.onInteract(ui);
    }
  }

  function canInteractWithWorld(worldCoord: Coord): boolean {
    const obj = ui.getWorld().getActiveLocation().getObjectVisibleOnCoord(worldCoord);
    const player = ui.getWorld().getPlayer();
    return Boolean(obj && isObjectsCloseby(player, obj) && obj.isInteractable(ui) && player.isFree());
  }

  const eventFactory = new GameEventFactory();

  return {
    onKeyEvent: (type: "keyup" | "keydown", key: string): boolean => {
      const event = eventFactory.createKeyboardEvent(type, key);
      if (event.type === "keydown" && event.key === "OPINIONS") {
        if (ui.getInfoModal() instanceof OpinionsView) {
          ui.hideInfoModal();
        } else {
          ui.showInfoModal(new OpinionsView({
            characters: getAllCharacters(),
            onClose: () => ui.hideInfoModal(),
          }));
        }
      }
      if (event.type === "keydown" && event.key === "SKILLS") {
        if (ui.getInfoModal() instanceof SkillsView) {
          ui.hideInfoModal();
        } else {
          ui.showInfoModal(new SkillsView({
            orgSkill: ui.getAttributes().orgSkill,
            onClose: () => ui.hideInfoModal(),
          }));
        }
      }
      if (ui.isGameWorldActive() && ui.isGameWorldVisible()) {
        const result = ui.getWorld().getPlayer().handleKeyEvent(event);
        ui.highlightCursor(canInteractWithWorld(toWorldCoord(ui.getMouseCoord())));
        screenNeedsRepaint = true;
        return result;
      }
      return false;
    },
    onMouseEvent: (type: GameEventType, coord: Coord, wheelDelta?: Coord) => {
      screenNeedsRepaint = true;
      const event = eventFactory.createEvent(type, coord, wheelDelta);
      if (type === "click") {
        if (!ui.handleGameEvent(event)) {
          // When the click was not handled by UI
          handleWorldClick(toWorldCoord(event.coord));
        }
      }
      else if (type === "mousemove") {
        if (ui.handleGameEvent(event)) {
          return;
        }
        if (ui.isGameWorldActive() && ui.isGameWorldVisible()) {
          ui.highlightCursor(canInteractWithWorld(toWorldCoord(event.coord)));
        } else {
          ui.highlightCursor(false);
        }
      } else {
        ui.handleGameEvent(event);
      }
    },
    cleanup: () => {
      loops.cleanup();
    },
  };
}

function isObjectsCloseby(obj1: GameObject, obj2: GameObject) {
  return rectDistance(objectBounds(obj1), objectBounds(obj2)) < 16;
}

function objectBounds(obj: GameObject): Rect {
  return rectTranslate(obj.boundingBox(), obj.getCoord());
}
