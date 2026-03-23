export default function GameOverOverlay({ score, highScore, onRestart }) {
  const isNew = score > 0 && score >= highScore;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 rounded gap-4">
      <span className="text-4xl" role="img" aria-label="game over">💀</span>
      <p className="font-pixel text-sm glow-purple">GAME OVER</p>
      {isNew && (
        <p className="font-pixel text-[10px] glow-green animate-pulse">
          ✨ NEW HIGH SCORE!
        </p>
      )}
      <p className="font-mono text-sm glow-green">SCORE: {score}</p>
      <button
        onClick={onRestart}
        className="font-pixel text-[10px] px-6 py-3 border-neon-purple rounded glow-purple hover:bg-purple-500/10 transition-all duration-200 active:scale-95"
      >
        PLAY AGAIN
      </button>
    </div>
  );
}
