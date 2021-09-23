import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { InventoryCmp } from "./cmp/InventoryCmp";
import { ObjectInventoryCmp } from "./cmp/ObjectInventoryCmp";
import { Coord, coordSub } from "./game/Coord";
import { runGame } from "./game/game";
import { Inventory } from "./game/Inventory";

export function App() {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [playerInventory, setPlayerInventory] = useState<Inventory>(
    new Inventory({ size: 5 })
  );
  const [objectInventory, setObjectInventory] = useState<
    Inventory | undefined
  >();

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

      const events = await runGame(ctx, {
        showInventory: setObjectInventory,
      });

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
        const coord = coordSub(
          coordSub([e.clientX, e.clientY], getPosition(canvas)),
          [-1, -1]
        );
        events.onClick(coord);
      });

      setPlayerInventory(events.inventory);
    };
    game();
  }, []);

  return (
    <AppWrapper>
      <GameCanvas
        id="canvas"
        width="1024"
        height="1024"
        ref={canvasEl}
      ></GameCanvas>
      <InventoryCmp
        items={playerInventory.items()}
        size={playerInventory.size()}
        onItemClick={(item) => {
          if (objectInventory) {
            playerInventory.remove(item);
            objectInventory.add(item);
          }
        }}
      />
      {objectInventory && (
        <ObjectInventoryCmp
          inventory={objectInventory}
          onClose={() => setObjectInventory(undefined)}
          onItemClick={(item) => {
            objectInventory.remove(item);
            playerInventory.add(item);
          }}
        />
      )}
    </AppWrapper>
  );
}

const GameCanvas = styled.canvas`
  font-smooth: never;
  -webkit-font-smoothing: none;
`;

const AppWrapper = styled.div`
  position: relative;
  width: 1024px;
  margin: 0 auto;
`;

// helper function to get an element's exact position
function getPosition(el: HTMLElement | null): Coord {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    if (el.tagName === "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

      xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
      yPosition += el.offsetTop - yScrollPos + el.clientTop;
    } else {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    }

    el = el.offsetParent as HTMLElement | null;
  }
  return [xPosition, yPosition];
}
