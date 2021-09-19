import { useEffect, useRef } from "react";
import "./App.css";
import { runGame } from "./game/game";
import killSound from "./game/sounds/kill.mp3";

function App() {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const audioEl = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const game = async () => {
      const ctx = canvasEl?.current?.getContext("2d");
      if (!ctx) {
        throw new Error("Unable to access canvas 2D context");
      }

      const audio = audioEl?.current;
      if (!audio) {
        throw new Error("Unable to access audio element");
      }

      const events = await runGame(ctx, "blah", audio);

      document.addEventListener("keydown", (e) => {
        e.preventDefault();
        events.onKeyDown(e.key);
      });
      document.addEventListener("keyup", (e) => {
        e.preventDefault();
        events.onKeyUp(e.key);
      });
    };
    game();
  });

  return (
    <div className="App">
      <canvas id="canvas" width="1024" height="1024" ref={canvasEl}></canvas>
      <audio src={killSound} ref={audioEl} />
    </div>
  );
}

export default App;
