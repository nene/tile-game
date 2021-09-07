import walkRightPath from './sprites/walk-right.png';
import grassPath from './sprites/grass.png';

const SIZE = 32;

class PixelScreen {
  constructor(ctx, {width, height, scale}) {
    this.ctx = ctx;
    this.rawWidth = width;
    this.rawHeight = height;
    this.scale = scale;
    this.ctx.imageSmoothingEnabled = false;
  }

  drawSprite(image, index, coord) {
    const source = [0, SIZE*index];
    this.ctx.drawImage(
      image,
      source[0], source[1], SIZE, SIZE,
      coord[0]*this.scale, coord[1]*this.scale, SIZE*this.scale, SIZE*this.scale
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

export async function runGame(ctx) {
  const walkRightImg = await loadImage(walkRightPath);
  const grassImg = await loadImage(grassPath);

  const screen = new PixelScreen(ctx, {width: 1024, height: 1024, scale: 4});
  drawField(screen, grassImg);
  screen.saveBg();
  runAnimation(screen, walkRightImg);
}

async function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.src = src;
  });
}

function runAnimation(screen, image) {
  let frame = 0;
  let prevTime = 0;
  let frameDuration = 100;
  let coord = [0, 0];
  function step(timestamp) {
    if (timestamp - prevTime > frameDuration) {
      screen.restoreBg();
      screen.drawSprite(image, frame, coord);
      frame = nextFrame(frame);
      prevTime = timestamp;
      coord = [(coord[0] + 3) % screen.width(), coord[1]];
    }
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function drawField(screen, image) {
  for (let y=0; y<screen.height(); y+=SIZE) {
    for (let x=0; x<screen.width(); x+=SIZE) {
      screen.drawSprite(image, 2+randomFrame(6), [x, y]);
    }
  }
}

function nextFrame(n) {
  return (n + 1) % 8;
}

function randomFrame(n) {
  return Math.floor(Math.random() * n);
}
