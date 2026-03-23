export default function StartOverlay({ onStart }) {
  const isMobile = window.innerWidth < 640;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded gap-5">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl">🐍</span>
        <p className="font-pixel text-xs glow-green tracking-widest">SNAKECORE</p>
        <p className="font-mono text-[10px] glow-blue">OOP SNAKE ENGINE</p>
      </div>
      <div className="font-mono text-[10px] text-gray-400 text-center leading-6">
        {isMobile ? (
          <>
            <span className="glow-green">Swipe</span> on screen to move
            <br />or use the <span className="glow-green">D-pad</span> below
          </>
        ) : (
          <>
            <span className="glow-green">WASD</span> / <span className="glow-green">↑↓←→</span> to move
            <br /><span className="glow-purple">R</span> to restart
          </>
        )}
      </div>
      <button
        onClick={onStart}
        className="font-pixel text-[10px] px-6 py-3 border-neon rounded glow-green hover:bg-neon-green/10 transition-all duration-200 active:scale-95"
      >
        {isMobile ? "TAP TO START" : "PRESS ENTER"}
      </button>
    </div>
  );
}
