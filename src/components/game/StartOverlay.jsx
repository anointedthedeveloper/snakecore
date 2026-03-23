export default function StartOverlay({ onStart }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded gap-5">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl" role="img" aria-label="snake">🐍</span>
        <p className="font-pixel text-xs glow-green tracking-widest">SNAKECORE</p>
        <p className="font-mono text-[10px] glow-blue">OOP SNAKE ENGINE</p>
      </div>
      <div className="font-mono text-[10px] text-gray-400 text-center leading-5">
        <span className="glow-green">WASD</span> / <span className="glow-green">↑↓←→</span> to move
        <br />
        <span className="glow-purple">R</span> to restart
      </div>
      <button
        onClick={onStart}
        className="font-pixel text-[10px] px-6 py-3 border-neon rounded glow-green hover:bg-neon-green/10 transition-all duration-200 active:scale-95"
      >
        PRESS ENTER
      </button>
    </div>
  );
}
