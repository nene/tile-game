import { SpriteLibrary } from "./SpriteLibrary";
import { Snail } from "./Snail";

export function generateNPCs(sprites: SpriteLibrary) {
  return [
    new Snail(sprites, [128, 32], 0),
    new Snail(sprites, [256, 64], 1),
    new Snail(sprites, [300, 100], 2),
    new Snail(sprites, [320, 150], 1),
    new Snail(sprites, [350, 200], 2),
  ];
}
