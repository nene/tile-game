import { AsepriteFile } from "./Aseprite";
import { readAsepriteAnimation } from "./readAsepriteAnimation";

describe("readAsepriteAnimation()", () => {
  it("reads and converts to SpriteAnimation frames", () => {
    const data: AsepriteFile = {
      "frames": [
        {
          "filename": "#base 0",
          "frame": { "x": 0, "y": 0, "w": 16, "h": 34 },
          "rotated": false,
          "trimmed": false,
          "spriteSourceSize": { "x": 0, "y": 0, "w": 16, "h": 34 },
          "sourceSize": { "w": 16, "h": 34 },
          "duration": 100
        },
        {
          "filename": "#base 1",
          "frame": { "x": 16, "y": 0, "w": 16, "h": 34 },
          "rotated": false,
          "trimmed": false,
          "spriteSourceSize": { "x": 0, "y": 0, "w": 16, "h": 34 },
          "sourceSize": { "w": 16, "h": 34 },
          "duration": 100
        },
        {
          "filename": "#w-right 0",
          "frame": { "x": 0, "y": 34, "w": 16, "h": 34 },
          "rotated": false,
          "trimmed": false,
          "spriteSourceSize": { "x": 0, "y": 0, "w": 16, "h": 34 },
          "sourceSize": { "w": 16, "h": 34 },
          "duration": 100
        },
        {
          "filename": "#w-right 1",
          "frame": { "x": 16, "y": 34, "w": 16, "h": 34 },
          "rotated": false,
          "trimmed": false,
          "spriteSourceSize": { "x": 0, "y": 0, "w": 16, "h": 34 },
          "sourceSize": { "w": 16, "h": 34 },
          "duration": 200
        },
        {
          "filename": "#w-left 0",
          "frame": { "x": 0, "y": 68, "w": 16, "h": 34 },
          "rotated": false,
          "trimmed": false,
          "spriteSourceSize": { "x": 0, "y": 0, "w": 16, "h": 34 },
          "sourceSize": { "w": 16, "h": 34 },
          "duration": 100
        },
      ],
      "meta": {
        "app": "https://www.aseprite.org/",
        "version": "1.2.30",
        "image": "cfe-reb.png",
        "format": "RGBA8888",
        "size": { "w": 144, "h": 238 },
        "scale": "1",
        "frameTags": [
          { "name": "base", "from": 0, "to": 1, "direction": "forward" },
          { "name": "w-right", "from": 2, "to": 3, "direction": "forward" },
          { "name": "w-left", "from": 4, "to": 4, "direction": "forward" },
        ]
      }
    };

    expect(readAsepriteAnimation("w-right", data)).toEqual([
      { coord: [0, 1], ticks: 1 },
      { coord: [1, 1], ticks: 2 },
    ]);
  });
});
