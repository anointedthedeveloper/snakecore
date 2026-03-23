export default function GameHUD({ score, highScore }) {
  return (
    <div className="flex gap-8 font-mono text-xs sm:text-sm shrink-0">
      <span className="glow-green">🍎 {score}</span>
      <span className="glow-purple">🏆 {highScore}</span>
    </div>
  );
}
