import grassPath from "./sprites/grass.png";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";
import { Player } from "./Player";
import { loadImage } from "./loadImage";

export async function runGame(ctx) {
  const player = new Player();
  await player.init();

  const grassImg = await loadImage(grassPath);
  const grassSprites = new SpriteSheet(grassImg, [32, 32], 8);

  const screen = new PixelScreen(ctx, { width: 1024, height: 1024, scale: 4 });
  drawField(screen, grassSprites);
  screen.saveBg();

  gameLoop(() => {
    player.tick(screen);
  });

  paintLoop(() => {
    screen.restoreBg();
    player.paint(screen);
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
