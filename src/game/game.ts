import { PixelScreen } from "./PixelScreen";
import { Player } from "./Player";
import { Background } from "./Background";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./SpriteLibrary";
import { SoundLibrary } from "./SoundLibrary";
import { CfeLocation } from "./CfeLocation";
import { Coord, coordAdd, coordDistance } from "./Coord";
import { InventoryController } from "./InventoryController";

const PIXEL_SCALE = 4;

export async function runGame(ctx: CanvasRenderingContext2D) {
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

  const inventoryController = new InventoryController(player.getInventory(), sprites);

  gameLoop(() => {
    world.allObjects().forEach((obj) => obj.tick(world));
    world.sortObjects();
    screenNeedsRepaint = true;
  });

  paintLoop(() => {
    if (!screenNeedsRepaint) {
      return; // Don't paint when app state hasn't changed
    }
    screen.centerTo(player.getCoord(), world);
    background.paint(screen);
    world.allObjects().forEach((obj) => obj.paint(screen));
    inventoryController.paint(screen);
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
    onClick: ([x, y]: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord: Coord = [Math.floor(x / PIXEL_SCALE), Math.floor(y / PIXEL_SCALE)];
      if (inventoryController.handleClick(screenCoord)) {
        return; // The click was handled by UI
      }
      const worldCoord = coordAdd(screenCoord, screen.getOffset());
      const obj = world.getObjectVisibleOnCoord(worldCoord);
      if (obj && coordDistance(player.getCoord(), obj.getCoord()) < 16 + 8) {
        obj.onInteract(inventoryController);
      }
    },
    onHover: ([x, y]: Coord) => {
      screenNeedsRepaint = true;
      const screenCoord: Coord = [Math.floor(x / PIXEL_SCALE), Math.floor(y / PIXEL_SCALE)];
      if (inventoryController.handleHover(screenCoord)) {
        return; // The click was handled by UI
      }
    },
  };
}

// setInterval() will fire about 1x per second when in background tab
function gameLoop(onTick: () => void) {
  const duration = 100;
  let prevTime = Date.now();
  setInterval(() => {
    const time = Date.now();
    while (prevTime + duration < time) {
      onTick();
      prevTime += duration;
    }
  }, duration / 2);
}

function paintLoop(onPaint: (time: number) => void) {
  function paint(time: number) {
    onPaint(time);
    window.requestAnimationFrame(paint);
  }
  window.requestAnimationFrame(paint);
}
