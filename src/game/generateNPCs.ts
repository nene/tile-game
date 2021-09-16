import { SpriteLibrary } from "./SpriteLibrary";
import { Snail } from "./Snail";

export function generateNPCs(sprites: SpriteLibrary) {
  return [
    new Snail(sprites, [128, 32]),
    new Snail(sprites, [256, 64]),
    new Snail(sprites, [300, 100]),
    new Snail(sprites, [320, 150]),
    new Snail(sprites, [350, 200]),
  ];
}
