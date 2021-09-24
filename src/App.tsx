import { useEffect, useRef } from "react";
import styled from "styled-components";
import { GameApi, runGame } from "./game/game";
import { mouseCoordRelativeTo } from "./mouseCoord";

export function App() {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasEl?.current;
    if (!canvas) {
      throw new Error("Unable to access canvas");
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to access canvas 2D context");
    }
    ctx.resetTransform();

    let gameApi: GameApi;
    const onKeyDown = (e: KeyboardEvent) => {
      if (gameApi.onKeyDown(e.key)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (gameApi.onKeyUp(e.key)) {
        e.preventDefault();
      }
    };
    const onClick = (e: MouseEvent) => {
      gameApi.onClick(mouseCoordRelativeTo(e, canvas));
    };
    const onMouseMove = (e: MouseEvent) => {
      gameApi.onHover(mouseCoordRelativeTo(e, canvas));
    };

    const game = async () => {
      gameApi = await runGame(ctx);

      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);

      canvas.addEventListener("click", onClick);
      canvas.addEventListener("mousemove", onMouseMove);
    };
    game();

    return () => {
      gameApi.cleanup();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
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
  cursor: none;
`;

const AppWrapper = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
`;
