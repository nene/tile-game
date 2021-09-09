import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";
import { Player } from "./Player";
import { ImageLibrary } from "./ImageLibrary";
import { Grass } from "./Grass";
import { GameObject } from "./GameObject";

export async function runGame(ctx: CanvasRenderingContext2D) {
  const screen = new PixelScreen(ctx, { width: 1024, height: 1024, scale: 4 });

  const gameObjects: GameObject[] = [];

  const images = new ImageLibrary();
  await images.load();

  const player = new Player(images);
  gameObjects.push(player);

  for (let i = 0; i < 50; i++) {
    gameObjects.push(new Grass(images, screen));
  }

  drawField(screen, new SpriteSheet(images.get('grassBg'), [32, 32], 1));
  screen.saveBg();

  gameLoop(() => {
    gameObjects.forEach((obj) => obj.tick(screen));
    gameObjects.sort((a, b) => {
      return a.zIndex() - b.zIndex();
    });
  });

  paintLoop(() => {
    screen.restoreBg();
    gameObjects.forEach((obj) => obj.paint(screen));
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

function drawField(screen: PixelScreen, fieldSprites: SpriteSheet) {
  for (let y = 0; y < screen.height(); y += fieldSprites.getSpriteHeight()) {
    for (let x = 0; x < screen.width(); x += fieldSprites.getSpriteWidth()) {
      screen.drawSprite(fieldSprites.getRandomSprite(), [x, y]);
    }
  }
}
