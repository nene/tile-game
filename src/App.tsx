import { useEffect, useRef } from "react";
import styled from "styled-components";
import { GameApi, runGame } from "./game/game";
import { mouseCoordRelativeTo } from "./mouseCoord";

const WIDTH = 320;
const HEIGHT = 200;
const PIXEL_SCALE = 4;

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
      gameApi.onMouseMove(mouseCoordRelativeTo(e, canvas));
    };
    const onMouseDown = (e: MouseEvent) => {
      gameApi.onMouseDown(mouseCoordRelativeTo(e, canvas));
    };
    const onMouseUp = (e: MouseEvent) => {
      gameApi.onMouseUp(mouseCoordRelativeTo(e, canvas));
    };
    const onWheel = (e: WheelEvent) => {
      gameApi.onWheel(mouseCoordRelativeTo(e, canvas), [e.deltaX, e.deltaY]);
    };

    const game = async () => {
      gameApi = await runGame(ctx, {
        width: WIDTH,
        height: HEIGHT,
        scale: PIXEL_SCALE,
      });

      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);

      canvas.addEventListener("click", onClick);
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("wheel", onWheel);
    };
    game();

    return () => {
      gameApi.cleanup();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <AppWrapper>
      <GameCanvas
        id="canvas"
        width={WIDTH * PIXEL_SCALE}
        height={HEIGHT * PIXEL_SCALE}
        ref={canvasEl}
      ></GameCanvas>
    </AppWrapper>
  );
}

const GameCanvas = styled.canvas`
  font-smooth: never;
  -webkit-font-smoothing: none;
  cursor: none;
  border: 4px solid #5c2d24;
`;

const AppWrapper = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
`;
