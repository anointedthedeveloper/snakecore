import { useRef, useEffect, useState } from "react";
import { CELL, COLS, ROWS } from "../../lib/snakeGame";
import { useSnakeGame } from "../../hooks/useSnakeGame";
import GameHUD from "./GameHUD";
import StartOverlay from "./StartOverlay";
import GameOverOverlay from "./GameOverOverlay";
import MobileControls from "./MobileControls";
import Footer from "./Footer";

const BASE_W = COLS * CELL; // 500
const BASE_H = ROWS * CELL; // 500
const ASPECT = BASE_W / BASE_H;

// Reserved px for: header ~36, hud ~28, mobile-controls ~100, footer ~36, gaps ~24
const CHROME_H = 224;
const CHROME_H_DESKTOP = 120;

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const { state, highScore, start, restart, swipe } = useSnakeGame(canvasRef);
  const [scale, setScale] = useState(1);
  const isMobile = () => window.innerWidth < 640;

  useEffect(() => {
    const resize = () => {
      const chrome = isMobile() ? CHROME_H : CHROME_H_DESKTOP;
      const availH = window.innerHeight - chrome;
      const availW = window.innerWidth - 32;
      // fit canvas inside available space keeping aspect ratio
      const byH = availH;
      const byW = availW / ASPECT;
      const fit = Math.min(byH, byW, BASE_H);
      setScale(fit / BASE_H);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const cw = Math.floor(BASE_W * scale);
  const ch = Math.floor(BASE_H * scale);

  return (
    <div className="game-shell">
      {/* Header */}
      <header className="flex items-center justify-center">
        <h1 className="font-pixel text-sm sm:text-base glow-green tracking-widest flex items-center gap-2">
          🐍 SNAKECORE
        </h1>
      </header>

      {/* HUD */}
      <GameHUD score={state.score} highScore={highScore} />

      {/* Canvas */}
      <div className="relative border-neon rounded" style={{ width: cw, height: ch }}>
        <canvas
          ref={canvasRef}
          width={BASE_W}
          height={BASE_H}
          className="rounded"
          style={{ width: cw, height: ch }}
        />
        {!state.started && !state.over && <StartOverlay onStart={start} />}
        {state.over && (
          <GameOverOverlay score={state.score} highScore={highScore} onRestart={restart} />
        )}
      </div>

      {/* Mobile D-pad */}
      <MobileControls onSwipe={swipe} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
