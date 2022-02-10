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
  slices?: AsepriteSlice[];
}

export interface AsepriteFrameTag {
  name: string;
  from: number;
  to: number;
  direction: string;
}

export interface AsepriteSlice {
  name: string;
  color: string;
  keys: AsepriteSliceKey[];
}

export interface AsepriteSliceKey {
  frame: number;
  bounds: AsepriteRect;
  center?: AsepriteRect;
}
