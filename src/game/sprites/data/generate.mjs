import { readFileSync } from "fs";

function readSprite(frame, bbox) {
  const size = [frame.frame.w, frame.frame.h];

  return {
    name: frame.filename,
    size: size,
    source: { coord: [frame.frame.x, frame.frame.y] + "", size },
    offset: [-bbox.x, -bbox.y],
    bbox: { coord: [0, 0], size: [bbox.w, bbox.h] },
  };
}

function readJson(filename) {
  const { meta, frames } = JSON.parse(readFileSync(filename, "utf8"));
  const bboxes = meta.slices.map((slice) => slice.keys[0].bounds);

  return frames.map((frame, i) => readSprite(frame, bboxes[i]));
}

console.log(readJson("./src/game/sprites/data/sheet.json"));
