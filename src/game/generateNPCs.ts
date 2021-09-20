import { SpriteLibrary } from "./SpriteLibrary";
import { Bursh } from "./Bursh";

export function generateNPCs(sprites: SpriteLibrary) {
  return [
    new Bursh(sprites, [256, 64], 1),
    new Bursh(sprites, [300, 100], 0),
    new Bursh(sprites, [320, 150], 1),
    new Bursh(sprites, [350, 200], 2),
  ];
}
