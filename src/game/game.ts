import { PixelScreen } from "./PixelScreen";
import { Player } from "./Player";
import { ImageLibrary } from "./ImageLibrary";
import { GameGrid } from "./GameGrid";
import { Background } from "./Background";
import { generateNPCs } from "./generateNPCs";
import { generatePlants } from "./generatePlants";
import { generateSurface } from "./generateSurface";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./SpriteLibrary";

export async function runGame(ctx: CanvasRenderingContext2D) {
  const screen = new PixelScreen(ctx, { width: 256, height: 256, scale: 4, offset: [16, 16] });
  const grid = new GameGrid({ rows: screen.width() / 16 + 2, cols: screen.height() / 16 + 2, tileSize: [16, 16] });
  const surface = generateSurface(grid);

  const world = new GameWorld({ width: grid.getCols() * 16, height: grid.getRows() * 16 });

  const images = new ImageLibrary();
  await images.load();
  const sprites = new SpriteLibrary(images);

  const background = new Background(grid, surface, sprites);

  const player = new Player(sprites, [32, 64]);
  world.add(player);

  world.add(...generateNPCs(sprites));
  world.add(...generatePlants(grid, surface, sprites));

  gameLoop(() => {
    world.allObjects().forEach((obj) => obj.tick(world));
    world.sortObjects();
  });

  paintLoop(() => {
    background.paint(screen);
    world.allObjects().forEach((obj) => obj.paint(screen));
  });

  return {
    onKeyDown: (key: string) => {
      player.handleKeyDown(key, world);
    },
    onKeyUp: (key: string) => {
      player.handleKeyUp(key, world);
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
