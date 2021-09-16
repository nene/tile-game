import { PixelScreen } from "./PixelScreen";
import { Player } from "./Player";
import { ImageLibrary } from "./ImageLibrary";
import { GameGrid } from "./GameGrid";
import { Background } from "./Background";
import { generatePlants } from "./generatePlants";
import { generateSurface } from "./generateSurface";
import { Snail } from "./Snail";
import { GameWorld } from "./GameWorld";

export async function runGame(ctx: CanvasRenderingContext2D) {
  const screen = new PixelScreen(ctx, { width: 1024, height: 1024, scale: 4 });
  const grid = new GameGrid({ rows: screen.width() / 16, cols: screen.height() / 16, tileSize: [16, 16] });
  const surface = generateSurface(grid);

  const world = new GameWorld();

  const images = new ImageLibrary();
  await images.load();

  world.add(new Background(grid, surface, images));

  const player = new Player(images);
  world.add(player);

  world.add(...[
    new Snail(images, [128, 32]),
    new Snail(images, [256, 64]),
    new Snail(images, [300, 100]),
    new Snail(images, [320, 150]),
    new Snail(images, [350, 200]),
  ]);

  world.add(...generatePlants(grid, surface, images));

  gameLoop(() => {
    world.allObjects().forEach((obj) => obj.tick(screen));
    world.sortObjects();
  });

  paintLoop(() => {
    world.allObjects().forEach((obj) => obj.paint(screen));
  });

  return {
    onKeyDown: (key: string) => {
      switch (key) {
        case "ArrowLeft":
          player.moveLeft();
          break;
        case "ArrowRight":
          player.moveRight();
          break;
        case "ArrowUp":
          player.moveUp();
          break;
        case "ArrowDown":
          player.moveDown();
          break;
        case " ":
          player.startDigging(world);
          break;
        default: // do nothing
      }
    },
    onKeyUp: (key: string) => {
      switch (key) {
        case "ArrowLeft":
          player.stopLeft();
          break;
        case "ArrowRight":
          player.stopRight();
          break;
        case "ArrowUp":
          player.stopUp();
          break;
        case "ArrowDown":
          player.stopDown();
          break;
        default: // do nothing
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
