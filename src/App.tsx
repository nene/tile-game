import { useEffect, useRef } from "react";
import styled from "styled-components";
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
        if (events.onKeyDown(e.key)) {
          e.preventDefault();
        }
      });
      document.addEventListener("keyup", (e) => {
        if (events.onKeyUp(e.key)) {
          e.preventDefault();
        }
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
    <AppWrapper>
      <canvas id="canvas" width="1024" height="1024" ref={canvasEl}></canvas>
      <Inventory />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  text-align: center;
  padding: 2em;
`;
