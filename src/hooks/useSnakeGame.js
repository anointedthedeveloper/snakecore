import { useEffect, useRef, useCallback, useState } from "react";
import { GameEngine, CELL, COLS, ROWS } from "../lib/snakeGame";

const BASE_SPEED = 150;
const MIN_SPEED = 60;
const SPEED_STEP = 5;

const KEY_MAP = {
  ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
  w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
  W: "UP", S: "DOWN", A: "LEFT", D: "RIGHT",
};

export function useSnakeGame(canvasRef) {
  const engine = useRef(new GameEngine());
  const animRef = useRef(null);
  const lastTick = useRef(0);
  const touchStart = useRef(null);
  const [state, setState] = useState(() => engine.current.getState());
  const [highScore, setHighScore] = useState(() =>
    parseInt(localStorage.getItem("snakecore_hs") || "0")
  );

  const getSpeed = (score) =>
    Math.max(MIN_SPEED, BASE_SPEED - Math.floor(score / 50) * SPEED_STEP);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { snake, food } = engine.current.getState();

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    // Grid
    ctx.strokeStyle = "rgba(57,255,20,0.04)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke();
    }

    // Food
    ctx.shadowColor = "#ff2d78";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#ff2d78";
    ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);
    ctx.shadowBlur = 0;

    // Snake
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.shadowColor = isHead ? "#39ff14" : "#00f0ff";
      ctx.shadowBlur = isHead ? 14 : 6;
      ctx.fillStyle = isHead ? "#39ff14" : `rgba(0,240,255,${1 - i / (snake.length + 5)})`;
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.shadowBlur = 0;
  }, [canvasRef]);

  const loop = useCallback((ts) => {
    const eng = engine.current;
    const speed = getSpeed(eng.score);
    if (ts - lastTick.current >= speed) {
      eng.tick();
      const s = eng.getState();
      setState({ ...s });
      if (s.over) {
        if (s.score > highScore) {
          setHighScore(s.score);
          localStorage.setItem("snakecore_hs", s.score);
        }
        draw();
        return;
      }
      lastTick.current = ts;
    }
    draw();
    animRef.current = requestAnimationFrame(loop);
  }, [draw, highScore]);

  const start = useCallback(() => {
    engine.current.start();
    setState(engine.current.getState());
    animRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const restart = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    engine.current.reset();
    engine.current.start();
    setState(engine.current.getState());
    lastTick.current = 0;
    animRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const swipe = useCallback((dir) => {
    engine.current.input(dir);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const dir = KEY_MAP[e.key];
      if (dir) { e.preventDefault(); engine.current.input(dir); }
      if (e.key === "r" || e.key === "R") restart();
      if ((e.key === "Enter" || e.key === " ") && !engine.current.started) start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [start, restart]);

  // Touch swipe on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
      // tap to start
      if (!engine.current.started) start();
    };

    const onTouchEnd = (e) => {
      e.preventDefault();
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return; // tap, not swipe
      if (Math.abs(dx) > Math.abs(dy)) {
        engine.current.input(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        engine.current.input(dy > 0 ? "DOWN" : "UP");
      }
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [canvasRef, start]);

  useEffect(() => {
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return { state, highScore, start, restart, swipe };
}
