import { Alignment, Rect } from "../Coord";
import { read9SliceSprites } from "./read9SliceSprites";
import { Sprite } from "./Sprite";

describe("read9SliceSprites()", () => {
  let slices: Record<Alignment, Sprite>;

  beforeEach(() => {
    slices = read9SliceSprites({} as HTMLImageElement, {
      "frames": [
        {
          "filename": "ribbon-frame",
          "frame": { "x": 0, "y": 0, "w": 1080, "h": 1080 },
          "rotated": false,
          "trimmed": false,
          "spriteSourceSize": { "x": 0, "y": 0, "w": 1080, "h": 1080 },
          "sourceSize": { "w": 1080, "h": 1080 },
          "duration": 100
        },
      ],
      "meta": {
        "app": "https://www.aseprite.org/",
        "version": "1.2.30",
        "image": "ribbon-frame.png",
        "format": "RGBA8888",
        "size": { "w": 1080, "h": 1080 },
        "scale": "1",
        "frameTags": [],
        "slices": [
          {
            "name": "9slice",
            "color": "#0000ffff",
            "keys": [
              {
                "frame": 0,
                "bounds": { "x": 1000, "y": 1000, "w": 80, "h": 80 },
                "center": { "x": 16, "y": 16, "w": 48, "h": 48 },
              }
            ]
          }
        ]
      }
    });
  });

  const extractRect = ({ coord, size }: Sprite): Rect => ({ coord, size });

  it("center sprite", () => {
    expect(extractRect(slices["center"])).toEqual({
      coord: [1016, 1016],
      size: [48, 48],
    });
  });

  it("top sprite", () => {
    expect(extractRect(slices["top"])).toEqual({
      coord: [1016, 1000],
      size: [48, 16],
    });
  });

  it("bottom sprite", () => {
    expect(extractRect(slices["bottom"])).toEqual({
      coord: [1016, 1064],
      size: [48, 16],
    });
  });

  it("left sprite", () => {
    expect(extractRect(slices["left"])).toEqual({
      coord: [1000, 1016],
      size: [16, 48],
    });
  });

  it("right sprite", () => {
    expect(extractRect(slices["right"])).toEqual({
      coord: [1064, 1016],
      size: [16, 48],
    });
  });

  it("top-left sprite", () => {
    expect(extractRect(slices["top-left"])).toEqual({
      coord: [1000, 1000],
      size: [16, 16],
    });
  });

  it("top-right sprite", () => {
    expect(extractRect(slices["top-right"])).toEqual({
      coord: [1064, 1000],
      size: [16, 16],
    });
  });

  it("bottom-left sprite", () => {
    expect(extractRect(slices["bottom-left"])).toEqual({
      coord: [1000, 1064],
      size: [16, 16],
    });
  });

  it("bottom-right sprite", () => {
    expect(extractRect(slices["bottom-right"])).toEqual({
      coord: [1064, 1064],
      size: [16, 16],
    });
  });
});
