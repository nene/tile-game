import { useEffect, useRef } from "react";
import styled from "styled-components";
import { GameApi, runGame } from "./game/game";
import { SCREEN_SCALE, SCREEN_SIZE } from "./game/ui/screen-size";
import { mouseCoordRelativeTo } from "./mouseCoord";

function getCanvasAndContext(canvasEl: React.RefObject<HTMLCanvasElement>): {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = canvasEl?.current;
  if (!canvas) {
    throw new Error("Unable to access canvas");
  }
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    throw new Error("Unable to access canvas 2D context");
  }
  return { el: canvas, ctx };
}

export function App() {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = getCanvasAndContext(canvasEl);
    canvas.ctx.resetTransform();

    const offscreenCanvas = getCanvasAndContext(offscreenCanvasEl);
    offscreenCanvas.ctx.resetTransform();

    let gameApi: GameApi;
    const onKeyDown = (e: KeyboardEvent) => {
      if (gameApi.onKeyEvent("keydown", e.key)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (gameApi.onKeyEvent("keyup", e.key)) {
        e.preventDefault();
      }
    };
    const onClick = (e: MouseEvent) => {
      gameApi.onMouseEvent("click", mouseCoordRelativeTo(e, canvas.el));
    };
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      gameApi.onMouseEvent("rightclick", mouseCoordRelativeTo(e, canvas.el));
    };
    const onMouseMove = (e: MouseEvent) => {
      gameApi.onMouseEvent("mousemove", mouseCoordRelativeTo(e, canvas.el));
    };
    const onMouseDown = (e: MouseEvent) => {
      gameApi.onMouseEvent("mousedown", mouseCoordRelativeTo(e, canvas.el));
    };
    const onMouseUp = (e: MouseEvent) => {
      gameApi.onMouseEvent("mouseup", mouseCoordRelativeTo(e, canvas.el));
    };
    const onWheel = (e: WheelEvent) => {
      gameApi.onMouseEvent("wheel", mouseCoordRelativeTo(e, canvas.el), [
        e.deltaX,
        e.deltaY,
      ]);
    };

    const game = async () => {
      gameApi = await runGame(canvas.ctx);

      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);

      canvas.el.addEventListener("click", onClick);
      canvas.el.addEventListener("contextmenu", onContextMenu);
      canvas.el.addEventListener("mousemove", onMouseMove);
      canvas.el.addEventListener("mousedown", onMouseDown);
      canvas.el.addEventListener("mouseup", onMouseUp);
      canvas.el.addEventListener("wheel", onWheel);
    };
    game();

    return () => {
      gameApi.cleanup();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      canvas.el.removeEventListener("click", onClick);
      canvas.el.removeEventListener("contextmenu", onContextMenu);
      canvas.el.removeEventListener("mousemove", onMouseMove);
      canvas.el.removeEventListener("mousedown", onMouseDown);
      canvas.el.removeEventListener("mouseup", onMouseUp);
      canvas.el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <AppWrapper>
      <GameCanvas
        id="canvas"
        width={SCREEN_SIZE[0] * SCREEN_SCALE}
        height={SCREEN_SIZE[1] * SCREEN_SCALE}
        ref={canvasEl}
      ></GameCanvas>
      <GameCanvas
        id="offscreen-canvas"
        width={SCREEN_SIZE[0] * SCREEN_SCALE}
        height={SCREEN_SIZE[1] * SCREEN_SCALE}
        ref={offscreenCanvasEl}
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
