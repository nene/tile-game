const WIDTH = 1024;
const HEIGHT = 1024;
const SIZE = 32;
const SCALE = 2;

export function runGame(ctx) {
  loadImage('mehike', (mehikeImg) => {
    loadImage('grass', (grassImg) => {
      ctx.imageSmoothingEnabled = false;
      drawField(ctx, grassImg);
      runAnimation(ctx, mehikeImg);
    });
  });
}

function loadImage(id, callback) {
  const img = document.getElementById(id);
  img.addEventListener('load', () => callback(img));
}

function runAnimation(ctx, image) {
  let frame = 0;
  let prevTime = 0;
  let frameDuration = 100;
  let coord = [0, 0];
  let oldCoord = [0,0];
  let bg = undefined;
  function step(timestamp) {
    if (timestamp - prevTime > frameDuration) {
      if (bg) {
        restoreSpriteBg(ctx, oldCoord, bg);
      }
      bg = saveSpriteBg(ctx, coord);
      drawSprite(ctx, image, frame, coord);
      frame = nextFrame(frame);
      prevTime = timestamp;
      oldCoord = coord;
      coord = [(coord[0] + 6) % 1024, coord[1]];
    }
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function drawField(ctx, image) {
  for (let y=0; y<HEIGHT; y+=SIZE*SCALE) {
    for (let x=0; x<WIDTH; x+=SIZE*SCALE) {
      drawSprite(ctx, image, 2+randomFrame(6), [x, y]);
    }
  }
}

function nextFrame(n) {
  return (n + 1) % 8;
}

function randomFrame(n) {
  return Math.floor(Math.random() * n);
}

function saveSpriteBg(ctx, coord) {
  return ctx.getImageData(coord[0], coord[1], SIZE*SCALE, SIZE*SCALE);
}

function restoreSpriteBg(ctx, coord, bgImage) {
  ctx.putImageData(bgImage, coord[0], coord[1]);
}

function drawSprite(ctx, image, index, coord) {
  const source = [0, SIZE*index];
  ctx.drawImage(image, source[0], source[1], SIZE, SIZE, coord[0], coord[1], SIZE*SCALE, SIZE*SCALE);
}
