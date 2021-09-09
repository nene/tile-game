import grassPath from "./sprites/grass-bg.png";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";
import { Player } from "./Player";
import { loadImage } from "./loadImage";
import { ImageLibrary } from "./ImageLibrary";
import { Grass } from "./Grass";

export async function runGame(ctx) {
  const grassImg = await loadImage(grassPath);
  const grassSprites = new SpriteSheet(grassImg, [32, 32], 1);

  const screen = new PixelScreen(ctx, { width: 1024, height: 1024, scale: 4 });

  const gameObjects = [];

  const images = new ImageLibrary();
  await images.load();

  const player = new Player();
  await player.init();
  gameObjects.push(player);

  for (let i = 0; i < 50; i++) {
    gameObjects.push(new Grass(images, screen));
  }

  // sort objects by their Y-position
  gameObjects.sort((a, b) => {
    return a.coord[1] - b.coord[1];
  });

  drawField(screen, grassSprites);
  screen.saveBg();

  gameLoop(() => {
    gameObjects.forEach((obj) => obj.tick(screen));
  });

  paintLoop(() => {
    screen.restoreBg();
    gameObjects.forEach((obj) => obj.paint(screen));
  });

  return {
    onKeyDown: (key) => {
      switch (key) {
        case "ArrowLeft":
          player.moveLeft();
          break;
        case "ArrowRight":
          player.moveRight();
          break;
        default: // do nothing
      }
    },
    onKeyUp: (key) => {
      switch (key) {
        case "ArrowLeft":
          player.stop();
          break;
        case "ArrowRight":
          player.stop();
          break;
        default: // do nothing
      }
    },
  };
}

// setInterval() will fire about 1x per second when in background tab
function gameLoop(onTick) {
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

function paintLoop(onPaint) {
  function paint(time) {
    onPaint(time);
    window.requestAnimationFrame(paint);
  }
  window.requestAnimationFrame(paint);
}

function drawField(screen, fieldSprites) {
  for (let y = 0; y < screen.height(); y += fieldSprites.getSpriteHeight()) {
    for (let x = 0; x < screen.width(); x += fieldSprites.getSpriteWidth()) {
      screen.drawSprite(fieldSprites.getRandomSprite(), [x, y]);
    }
  }
}
