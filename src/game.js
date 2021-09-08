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
  runAnimation(screen, walkSprites);
}

async function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.src = src;
  });
}

function runAnimation(screen, walkSprites) {
  let prevTime = 0;
  let frameDuration = 100;
  let coord = [0, 0];
  function step(timestamp) {
    if (timestamp - prevTime > frameDuration) {
      screen.restoreBg();
      screen.drawSprite(walkSprites.getNextSprite(), coord);
      prevTime = timestamp;
      coord = [(coord[0] + 3) % screen.width(), coord[1]];
    }
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function drawField(screen, fieldSprites) {
  for (let y = 0; y < screen.height(); y += fieldSprites.getSpriteHeight()) {
    for (let x = 0; x < screen.width(); x += fieldSprites.getSpriteWidth()) {
      screen.drawSprite(fieldSprites.getRandomSprite(), [x, y]);
    }
  }
}
