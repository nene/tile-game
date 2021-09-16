import { ImageLibrary } from "./ImageLibrary";
import { Snail } from "./Snail";

export function generateNPCs(images: ImageLibrary) {
  return [
    new Snail(images, [128, 32]),
    new Snail(images, [256, 64]),
    new Snail(images, [300, 100]),
    new Snail(images, [320, 150]),
    new Snail(images, [350, 200]),
  ];
}
