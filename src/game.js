import walkRightPath from "./sprites/walk-right.png";
import grassPath from "./sprites/grass.png";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";

export async function runGame(ctx) {
  const walkRightImg = await loadImage(walkRightPath);
  const walkSprites = new SpriteSheet(walkRightImg, [32, 32], 8);
  const grassImg = await loadImage(grassPath);
  const grassSprites = new SpriteSheet(grassImg, [32, 32], 8);

  const screen = new PixelScreen(ctx, { width: 1024, height: 1024, scale: 4 });
  drawField(screen, grassSprites);
  screen.saveBg();

  let coord = [0, 0];
  let sprite = walkSprites.getSprite(0);

  gameLoop(() => {
    coord = [(coord[0] + 3) % screen.width(), coord[1]];
    sprite = walkSprites.getNextSprite();
  });

  paintLoop(() => {
    screen.restoreBg();
    screen.drawSprite(sprite, coord);
  });
}

async function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.src = src;
  });
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
  }, duration);
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
