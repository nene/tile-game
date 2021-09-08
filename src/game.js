import walkRightPath from "./sprites/walk-right.png";
import walkLeftPath from "./sprites/walk-left.png";
import grassPath from "./sprites/grass.png";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";

class Player {
  constructor() {
    this.coord = [0, 0];
    this.speed = 3;
  }

  async init() {
    this.walkRight = new SpriteSheet(
      await loadImage(walkRightPath),
      [32, 32],
      8
    );
    this.walkLeft = new SpriteSheet(await loadImage(walkLeftPath), [32, 32], 8);
    this.activeSpriteSheet = this.walkRight;
    this.sprite = this.activeSpriteSheet.getSprite(0);
  }

  tick(screen) {
    this.coord = [this.coord[0] + this.speed, this.coord[1]];
    if (this.coord[0] > screen.width() - 32) {
      this.activeSpriteSheet = this.walkLeft;
      this.speed = -3;
      this.coord = [this.coord[0] + this.speed, 0];
    }
    if (this.coord[0] < 0) {
      this.activeSpriteSheet = this.walkRight;
      this.speed = 3;
      this.coord = [this.coord[0] + this.speed, 0];
    }
    this.sprite = this.activeSpriteSheet.getNextSprite();
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
