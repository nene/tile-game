// Type definitions for Aseprite JSON

export interface AsepriteFile {
  frames: AsepriteFrame[];
  meta: AsepriteMeta;
}

export interface AsepriteFrame {
  filename: string;
  frame: AsepriteRect;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: AsepriteRect;
  sourceSize: AsepriteSize;
  duration: number;
}

export interface AsepriteRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AsepriteSize {
  w: number;
  h: number;
}

export interface AsepriteMeta {
  app: string;
  version: string;
  image: string;
  format: string;
  size: AsepriteSize;
  scale: string;
  frameTags: AsepriteFrameTag[];
}

export interface AsepriteFrameTag {
  name: string;
  from: number;
  to: number;
  direction: string;
}
