import { PixelScreen } from "./PixelScreen";
import { Player } from "./Player";
import { ImageLibrary } from "./ImageLibrary";
import { GameGrid } from "./GameGrid";
import { Background } from "./Background";
import { generateNPCs } from "./generateNPCs";
import { createCfeSurface } from "./createCfeSurface";
import { GameWorld } from "./GameWorld";
import { SpriteLibrary } from "./SpriteLibrary";
import { Coord } from "./Coord";
import { SoundLibrary } from "./SoundLibrary";

const WORLD_SIZE: Coord = [32, 32]; // in tiles

export async function runGame(ctx: CanvasRenderingContext2D, seed: string) {
  const screen = new PixelScreen(ctx, { width: 256, height: 256, scale: 4, offset: [16, 16] });
  const grid = new GameGrid({ rows: WORLD_SIZE[0], cols: WORLD_SIZE[1], tileSize: [16, 16] });
  const surface = createCfeSurface(grid);

  const world = new GameWorld({ width: WORLD_SIZE[0] * 16, height: WORLD_SIZE[1] * 16 });

  const images = new ImageLibrary();
  await images.load();
  const sprites = new SpriteLibrary(images);

  const sounds = new SoundLibrary();
  await sounds.load();

  const background = new Background(grid, surface, sprites);

  const player = new Player(sprites, [32, 64]);
  world.add(player);

  world.add(...generateNPCs(sprites));

  gameLoop(() => {
    world.allObjects().forEach((obj) => obj.tick(world));
    world.sortObjects();
  });

  paintLoop(() => {
    screen.centerTo(player.getCoord(), world);
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
