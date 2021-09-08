export class PixelScreen {
  constructor(ctx, { width, height, scale }) {
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
      sprite.coord[0],
      sprite.coord[1],
      sprite.size[0],
      sprite.size[1],
      coord[0],
      coord[1],
      sprite.size[0],
      sprite.size[1]
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
