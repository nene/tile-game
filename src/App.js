import { useEffect, useRef } from 'react';
import './App.css';
import { runGame } from './game';

function App() {
  const canvasEl = useRef(null);

  useEffect(() => {
    const ctx = canvasEl.current.getContext('2d');
    runGame(ctx);
  });

  return (
    <div className="App">
      <canvas id="canvas" width="1024" height="1024" ref={canvasEl}></canvas>
    </div>
  );
}

export default App;
