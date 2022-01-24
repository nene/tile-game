import { coordDiv } from "../Coord";
import { AsepriteFile, AsepriteFrame } from "./Aseprite";
import { FrameWithTicks } from "./SpriteAnimation";

export function readAsepriteAnimation(tag: string, file: AsepriteFile): FrameWithTicks[] {
  return getFramesByTagName(tag, file).map(toFrameWithTicks);
}

function getFramesByTagName(tag: string, file: AsepriteFile): AsepriteFrame[] {
  const frameTag = file.meta.frameTags.find(({ name }) => name === tag);
  if (!frameTag) {
    throw new Error(`Tag ${tag} not found from Aseprite JSON data.`);
  }
  const frames = file.frames.slice(frameTag.from, frameTag.to + 1);
  if (frameTag.direction === "pingpong") {
    return [...frames, ...frames.slice(1, frames.length - 1).reverse()];
  }
  return frames;
}

function toFrameWithTicks({ frame, sourceSize, duration }: AsepriteFrame): FrameWithTicks {
  return {
    coord: coordDiv([frame.x, frame.y], [sourceSize.w, sourceSize.h]),
    ticks: duration / 100,
  };
}
