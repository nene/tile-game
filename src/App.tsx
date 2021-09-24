import { useEffect, useRef } from "react";
import styled from "styled-components";
import { runGame } from "./game/game";
import { mouseCoordRelativeTo } from "./mouseCoord";

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
      ctx.resetTransform();

      const events = await runGame(ctx);

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
        events.onClick(mouseCoordRelativeTo(e, canvas));
      });
      canvas.addEventListener("mousemove", (e) => {
        events.onHover(mouseCoordRelativeTo(e, canvas));
      });
    };
    game();
  }, []);

  return (
    <AppWrapper>
      <GameCanvas
        id="canvas"
        width="1280"
        height="800"
        ref={canvasEl}
      ></GameCanvas>
    </AppWrapper>
  );
}

const GameCanvas = styled.canvas`
  font-smooth: never;
  -webkit-font-smoothing: none;
`;

const AppWrapper = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
`;
