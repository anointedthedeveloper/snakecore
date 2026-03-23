import { useRef, useEffect, useState } from "react";
import { CELL, COLS, ROWS } from "../../lib/snakeGame";
import { useSnakeGame } from "../../hooks/useSnakeGame";
import GameHUD from "./GameHUD";
import StartOverlay from "./StartOverlay";
import GameOverOverlay from "./GameOverOverlay";
import MobileControls from "./MobileControls";
import Footer from "./Footer";

const BASE_W = COLS * CELL;
const BASE_H = ROWS * CELL;
const ASPECT = BASE_W / BASE_H;

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const { state, highScore, start, restart, swipe } = useSnakeGame(canvasRef);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Prevent pull-to-refresh and page scroll on mobile
    const prevent = (e) => e.preventDefault();
    document.addEventListener("touchmove", prevent, { passive: false });
    return () => document.removeEventListener("touchmove", prevent);
  }, []);

  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth < 640;
      // header(36) + hud(28) + dpad(112) + footer(28) + gaps(30) = 234 mobile
      // header(36) + hud(28) + footer(28) + gaps(20) = 112 desktop
      const chrome = mobile ? 234 : 112;
      const availH = window.innerHeight - chrome;
      const availW = window.innerWidth - 24;
      const fit = Math.min(availH, availW / ASPECT, BASE_H);
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
      <header className="shrink-0 flex items-center justify-center">
        <h1 className="font-pixel text-sm sm:text-base glow-green tracking-widest">
          🐍 SNAKECORE
        </h1>
      </header>

      <GameHUD score={state.score} highScore={highScore} />

      <div className="relative border-neon rounded shrink-0" style={{ width: cw, height: ch }}>
        <canvas
          ref={canvasRef}
          width={BASE_W}
          height={BASE_H}
          className="rounded"
          style={{ width: cw, height: ch, touchAction: "none" }}
        />
        {!state.started && !state.over && <StartOverlay onStart={start} />}
        {state.over && (
          <GameOverOverlay score={state.score} highScore={highScore} onRestart={restart} />
        )}
      </div>

      <MobileControls onSwipe={swipe} />

      <Footer />
    </div>
  );
}
