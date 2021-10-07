import { Coord } from "../Coord";
import { TextStyle } from "../PixelScreen";
import { fitText, TextMeasurer } from "./fitText";

const mockScreen: TextMeasurer = {
  measureText(text: string | number, blah: TextStyle): Coord {
    return [String(text).length, 0];
  }
};

describe("fitText()", () => {
  it("leaves short text as is", () => {
    expect(fitText(mockScreen, [20, 10], "Hello, world!", {})).toEqual([
      "Hello, world!"
    ]);
  });

  it("splits long text into lines", () => {
    //                                    1234567890123456789|1234567890123456789|12
    expect(fitText(mockScreen, [20, 10], "Hello, my dear fux. How has your day been?", {})).toEqual([
      "Hello, my dear fux.",
      "How has your day",
      "been?",
    ]);
  });

  it("allows for unsplittable long words", () => {
    //                                    1234567890123456789|1234567890123456789|12
    expect(fitText(mockScreen, [20, 10], "Abajabakaradbadarbaragra. Whaazzap dude?", {})).toEqual([
      "Abajabakaradbadarbaragra.",
      "Whaazzap dude?"
    ]);
  });

  it("keeps original line breaks", () => {
    //                                    123456  1234567890123456789|1234567890 1234567890123456789|12345
    expect(fitText(mockScreen, [20, 10], "Hello,\nmy dear fraater. How are you?\nWe, fuxes, are doing fine.", {})).toEqual([
      "Hello,",
      "my dear fraater. How",
      "are you?",
      "We, fuxes, are doing",
      "fine.",
    ]);
  });
});
