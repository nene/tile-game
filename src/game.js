import walkRightPath from "./sprites/walk-right.png";
import grassPath from "./sprites/grass.png";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";

class Player {
  constructor() {
    this.coord = [0, 0];
  }

  async init() {
    this.walkSprites = new SpriteSheet(
      await loadImage(walkRightPath),
      [32, 32],
      8
    );
    this.sprite = this.walkSprites.getSprite(0);
  }

  tick(screen) {
    this.coord = [(this.coord[0] + 3) % screen.width(), this.coord[1]];
    this.sprite = this.walkSprites.getNextSprite();
  }

  paint(screen) {
    screen.drawSprite(this.sprite, this.coord);
  }
}

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
