import { useEffect, useRef } from "react";
import "./App.css";
import { Inventory } from "./cmp/Inventory";
import { Coord } from "./game/Coord";
import { runGame } from "./game/game";

export function App() {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const game = async () => {
      const canvas = canvasEl?.current;
      if (!canvas) {
        throw new Error("Unable to access canvas");
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Unable to access canvas 2D context");
      }
      const events = await runGame(ctx, "blah");

      document.addEventListener("keydown", (e) => {
        e.preventDefault();
        events.onKeyDown(e.key);
      });
      document.addEventListener("keyup", (e) => {
        e.preventDefault();
        events.onKeyUp(e.key);
      });

      canvas.addEventListener("click", (e) => {
        const coord: Coord = [
          e.clientX - canvas.offsetLeft - 1,
          e.clientY - canvas.offsetTop - 1,
        ];
        events.onClick(coord);
      });
    };
    game();
  });

  return (
    <div className="App">
      <canvas id="canvas" width="1024" height="1024" ref={canvasEl}></canvas>
      <Inventory />
    </div>
  );
}
