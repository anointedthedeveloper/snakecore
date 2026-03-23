const BTN =
  "w-10 h-10 border-neon rounded flex items-center justify-center glow-green font-pixel text-[10px] active:bg-neon-green/20 select-none cursor-pointer shrink-0";

export default function MobileControls({ onSwipe }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:hidden shrink-0">
      <button className={BTN} onPointerDown={() => onSwipe("UP")}>▲</button>
      <div className="flex gap-1">
        <button className={BTN} onPointerDown={() => onSwipe("LEFT")}>◀</button>
        <button className={BTN} onPointerDown={() => onSwipe("DOWN")}>▼</button>
        <button className={BTN} onPointerDown={() => onSwipe("RIGHT")}>▶</button>
      </div>
    </div>
  );
}
