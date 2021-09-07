import walkRightPath from './sprites/walk-right.png';
import grassPath from './sprites/grass.png';

class PixelScreen {
  constructor(ctx, {width, height, scale}) {
    this.ctx = ctx;
    this.rawWidth = width;
    this.rawHeight = height;
    this.scale = scale;
    this.ctx.scale(scale, scale);
    this.ctx.imageSmoothingEnabled = false;
  }

  drawSprite(sprite, coord) {
    this.ctx.drawImage(
      sprite.image,
      sprite.coord[0], sprite.coord[1], sprite.size[0], sprite.size[1],
      coord[0], coord[1], sprite.size[0], sprite.size[1]
    );
  }

  saveBg() {
    this.bg = this.ctx.getImageData(0, 0, this.rawWidth, this.rawHeight);
  }

  restoreBg() {
    this.ctx.putImageData(this.bg, 0, 0);
  }

  width() {
    return this.rawWidth / this.scale;
  }

  height() {
    return this.rawHeight / this.scale;
  }
}

class SpriteSheet {
  constructor(image, [width, height], count) {
    this.image = image;
    this.size = [width, height];
    this.count = count;
    this.index = 0;
  }

  getNextSprite() {
    const sprite = this.getSprite(this.index);
    this.index = (this.index + 1) % this.count;
    return sprite;
  }

  getRandomSprite() {
    return this.getSprite(Math.floor(Math.random() * this.count));
  }

  getSprite(index) {
    return {
      image: this.image,
      coord: this.getSpriteCoord(index),
      size: this.size,
    };
  }

  getSpriteCoord(index) {
    return [0, this.size[1] * index];
  }

  getSpriteWidth() {
    return this.size[0];
  }

  getSpriteHeight() {
    return this.size[1];
  }
}

export async function runGame(ctx) {
  const walkRightImg = await loadImage(walkRightPath);
  const walkSprites = new SpriteSheet(walkRightImg, [32, 32], 8);
  const grassImg = await loadImage(grassPath);
  const grassSprites = new SpriteSheet(grassImg, [32, 32], 8);

  const screen = new PixelScreen(ctx, {width: 1024, height: 1024, scale: 4});
  drawField(screen, grassSprites);
  screen.saveBg();
  runAnimation(screen, walkSprites);
}

async function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
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
  for (let y=0; y<screen.height(); y+=fieldSprites.getSpriteHeight()) {
    for (let x=0; x<screen.width(); x+=fieldSprites.getSpriteWidth()) {
      screen.drawSprite(fieldSprites.getRandomSprite(), [x, y]);
    }
  }
}
