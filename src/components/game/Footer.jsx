export default function Footer() {
  return (
    <footer className="font-mono text-[10px] text-gray-500 text-center flex flex-col items-center gap-0.5 shrink-0">
      <a
        href="https://github.com/anointedthedeveloper"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="anointedthedeveloper on GitHub"
        className="glow-blue hover:underline flex items-center gap-1"
      >
        🐙 anointedthedeveloper
      </a>
      <span className="text-gray-700">SnakeCore · OOP Snake Game Engine</span>
    </footer>
  );
}
