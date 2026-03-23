const BTN =
  "w-12 h-12 border-neon rounded flex items-center justify-center glow-green text-base active:bg-neon-green/20 select-none touch-none";

export default function MobileControls({ onSwipe }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:hidden shrink-0" style={{ touchAction: "none" }}>
      <button className={BTN} onPointerDown={(e) => { e.preventDefault(); onSwipe("UP"); }}>▲</button>
      <div className="flex gap-1">
        <button className={BTN} onPointerDown={(e) => { e.preventDefault(); onSwipe("LEFT"); }}>◀</button>
        <button className={BTN} onPointerDown={(e) => { e.preventDefault(); onSwipe("DOWN"); }}>▼</button>
        <button className={BTN} onPointerDown={(e) => { e.preventDefault(); onSwipe("RIGHT"); }}>▶</button>
      </div>
    </div>
  );
}
