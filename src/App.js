import { useEffect, useRef } from "react";
import "./App.css";
import { runGame } from "./game";

function App() {
  const canvasEl = useRef(null);

  useEffect(() => {
    const game = async () => {
      const ctx = canvasEl.current.getContext("2d");
      const events = await runGame(ctx);

      document.addEventListener("keydown", (e) => {
        events.onKeyDown(e.key);
      });
      document.addEventListener("keyup", (e) => {
        events.onKeyUp(e.key);
      });
    };
    game();
  });

  return (
    <div className="App">
      <canvas id="canvas" width="1024" height="1024" ref={canvasEl}></canvas>
    </div>
  );
}

export default App;
